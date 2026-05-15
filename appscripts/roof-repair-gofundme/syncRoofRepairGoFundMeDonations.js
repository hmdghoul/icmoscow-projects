const CAMPAIGN_URL = "https://www.gofundme.com/f/help-us-replace-the-roofing-of-the-moscow-islamic-center";

const FOLDER_NAME = "ICM Projects";
const DATABASE_NAME = "ICM Projects Database";
const DONATIONS_SHEET_NAME = "donations";

const PROJECT_ID = "roof-repair";
const SOURCE = "GoFundMe";

const HEADERS = ["id", "projectId", "source", "amount", "date", "note"];

function doPost(e) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('API_KEY');
  if (!apiKey || e.parameter.key !== apiKey) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    syncGoFundMeDonations();
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---------------------------------------------------------------------------
// Main entry point — run this manually or on a time-based trigger
// ---------------------------------------------------------------------------

function syncGoFundMeDonations() {
  const sheet = getDonationsSheet_();
  ensureHeaders_(sheet);

  const { donations } = scrapeGoFundMe_();
  const existingIds = getExistingDonationIds_(sheet);

  const newRows = donations
    .filter((d) => !existingIds.has(d.id))
    .map((d) => [
      d.id,
      PROJECT_ID,
      SOURCE,
      d.amount,
      formatDate_(d.date),
      d.isAnonymous ? "Anonymous donor" : `Donor: ${d.name}`,
    ]);

  if (newRows.length > 0) {
    sheet
      .getRange(sheet.getLastRow() + 1, 1, newRows.length, HEADERS.length)
      .setValues(newRows);
  }

  Logger.log(
    `Sync complete — ${newRows.length} new, ${donations.length - newRows.length} already recorded.`
  );
}

// ---------------------------------------------------------------------------
// Scraping
// ---------------------------------------------------------------------------

function scrapeGoFundMe_() {
  const response = UrlFetchApp.fetch(CAMPAIGN_URL, {
    muteHttpExceptions: true,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "priority": "u=0, i",
      "sec-ch-ua": '"Chromium";v="148", "Microsoft Edge";v="148", "Not/A)Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
  });

  const statusCode = response.getResponseCode();
  if (statusCode !== 200) {
    const preview = response.getContentText().substring(0, 300);
    throw new Error(`GoFundMe returned HTTP ${statusCode}. Response preview: ${preview}`);
  }

  const html = response.getContentText();
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
  );
  if (!match) throw new Error("Could not find __NEXT_DATA__ in GoFundMe page.");

  const apolloState = JSON.parse(match[1])?.props?.pageProps?.__APOLLO_STATE__;
  if (!apolloState) throw new Error("Could not find __APOLLO_STATE__ in GoFundMe page.");

  const fundraiserKey = Object.keys(apolloState).find((key) => key.startsWith("Fundraiser:"));
  if (!fundraiserKey) throw new Error("No Fundraiser entry found in Apollo cache.");

  const fundraiser = apolloState[fundraiserKey];

  // Use GoFundMe's own numeric donation ID as the stable unique key
  const donations = Object.entries(apolloState)
    .filter(([key]) => key.startsWith("Donation:"))
    .map(([key, v]) => ({
      id: `gofundme-${key.split(":")[1]}`,
      name: v.name || "Anonymous",
      isAnonymous: !!v.isAnonymous,
      amount: v.amount?.amount || 0,
      currency: v.amount?.currencyCode || "USD",
      date: v.createdAt || "",
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    title: (fundraiser.title || "").trim(),
    currentAmount: fundraiser.currentAmount?.amount || 0,
    goalAmount: fundraiser.goalAmount?.amount || 0,
    donationCount: fundraiser.donationCount || 0,
    donations,
  };
}

// ---------------------------------------------------------------------------
// Sheet helpers
// ---------------------------------------------------------------------------

function getDonationsSheet_() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  if (!folders.hasNext()) throw new Error(`Drive folder not found: "${FOLDER_NAME}"`);

  const files = folders.next().getFilesByName(DATABASE_NAME);
  if (!files.hasNext()) throw new Error(`Spreadsheet not found: "${DATABASE_NAME}"`);

  const ss = SpreadsheetApp.open(files.next());
  const sheet = ss.getSheetByName(DONATIONS_SHEET_NAME);
  if (!sheet) throw new Error(`Sheet tab not found: "${DONATIONS_SHEET_NAME}"`);

  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }

  const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const match = HEADERS.every((h, i) => existing[i] === h);
  if (!match) {
    throw new Error(
      `Unexpected headers in "${DONATIONS_SHEET_NAME}". Expected: ${HEADERS.join(", ")} — Got: ${existing.join(", ")}`
    );
  }
}

function getExistingDonationIds_(sheet) {
  if (sheet.getLastRow() < 2) return new Set();
  const ids = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat();
  return new Set(ids.filter(Boolean));
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function formatDate_(dateValue) {
  // Parse the ISO string and format in UTC to avoid timezone-induced date shifts
  return Utilities.formatDate(new Date(dateValue), "UTC", "yyyy-MM-dd");
}

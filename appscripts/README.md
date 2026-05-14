# Google Apps Script Setup with `clasp`

This guide explains how to connect a Google Apps Script project to your local machine and GitHub using `clasp`, the official command-line tool for Google Apps Script.

---

## What is `clasp`?

`clasp` (Command Line Apps Script Projects) is an official tool from Google Apps Script that allows you to:

- Download your Apps Script code to your computer
- Edit it in your favorite editor
- Track changes using Git and GitHub
- Push updates back to Google Apps Script

Official documentation:
- https://developers.google.com/apps-script/guides/clasp
- https://github.com/google/clasp

---

## Prerequisites

Before you begin, make sure you have:

- Node.js installed
- A Google account
- Access to the Apps Script project
- Git installed (optional, but recommended)

---

## 1. Install `clasp`

```bash
npm install -g @google/clasp
```

Verify installation:

```bash
clasp --version
```

---

## 2. Login to Google

Authenticate `clasp` with your Google account:

```bash
clasp login
```

This command will:

1. Open your browser.
2. Ask you to sign in to your Google account.
3. Request permission to access Google Apps Script.
4. Save your authentication token locally.

---

## 3. Verify Authentication

```bash
clasp list
```

If login was successful, you will see a list of your Apps Script projects.

---

## 4. Clone an Existing Script Project

1. Open your Apps Script project.
2. Go to **Project Settings**.
3. Copy the **Script ID**.

Then run:

```bash
clasp clone YOUR_SCRIPT_ID
```

---

## 5. Create a New Apps Script Project

```bash
clasp create --title "ICM GoFundMe Sync"
```

---

## 6. Push Local Changes

```bash
clasp push
```

---

## 7. Pull Remote Changes

```bash
clasp pull
```

---

## 8. Open the Script in Browser

```bash
clasp open
```

---

## 9. Logout

```bash
clasp logout
```

---

## Connect to GitHub

```bash
git init
git add .
git commit -m "Initial import of Apps Script project"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Recommended `.gitignore`

```gitignore
node_modules/
```

---

## Typical Workflow

```bash
clasp pull
# edit files
git add .
git commit -m "Update Apps Script"
git push
clasp push
```

---

## Files Created by `clasp`

```text
.
├── appsscript.json
├── Code.js
└── .clasp.json
```

---

## Useful Commands

```bash
clasp login
clasp list
clasp clone <SCRIPT_ID>
clasp pull
clasp push
clasp open
clasp logout
```
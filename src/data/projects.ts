export interface DonationSource {
  source: string
  amount: number
  date: string
}

export interface Expense {
  item: string
  amount: number
  date: string
  receipt?: string
}

export interface TimelineEntry {
  date: string
  update: string
}

export interface Project {
  id: string
  title: string
  status: 'active' | 'completed' | 'future'
  shortDescription: string
  goal: number
  raised: number
  donationSources: DonationSource[]
  expenses: Expense[]
  timeline: TimelineEntry[]
}

export const projects: Project[] = [
  {
    id: 'roof-repair',
    title: 'Roof Repair Project',
    status: 'active',
    shortDescription:
      'Emergency repair of the main prayer hall roof to prevent water damage and structural deterioration.',
    goal: 15000,
    raised: 8750,
    donationSources: [
      { source: 'GoFundMe Campaign', amount: 4200, date: '2025-03-01' },
      { source: 'Friday Donation Box', amount: 2100, date: '2025-04-15' },
      { source: 'Community Fundraiser Dinner', amount: 1850, date: '2025-04-28' },
      { source: 'Private Donor (Anonymous)', amount: 600, date: '2025-05-02' },
    ],
    expenses: [
      { item: 'Roof inspection & assessment', amount: 350, date: '2025-03-10', receipt: 'Receipt #001' },
      { item: 'Roofing materials (shingles, membrane)', amount: 2800, date: '2025-04-01', receipt: 'Receipt #002' },
      { item: 'Labor — partial repair (Phase 1)', amount: 1600, date: '2025-04-20', receipt: 'Receipt #003' },
      { item: 'Scaffolding rental', amount: 450, date: '2025-04-20', receipt: 'Receipt #004' },
    ],
    timeline: [
      { date: '2025-03-05', update: 'Roof damage identified after heavy snowfall. Leadership meeting held to assess urgency.' },
      { date: '2025-03-10', update: 'Professional inspection completed. Contractor provided written estimate of $15,000.' },
      { date: '2025-03-15', update: 'GoFundMe campaign launched. Community informed via Friday khutbah.' },
      { date: '2025-04-15', update: 'Phase 1 repairs begun. Scaffolding installed and damaged sections stripped.' },
      { date: '2025-05-01', update: 'Phase 1 complete. Awaiting additional funds to begin Phase 2 (full re-membrane).' },
    ],
  },
  {
    id: 'plumbing-repair',
    title: 'Plumbing Repair',
    status: 'completed',
    shortDescription:
      'Replacement of aging wudu (ablution) station pipes and fixtures in the men\'s and women\'s facilities.',
    goal: 3500,
    raised: 3500,
    donationSources: [
      { source: 'Friday Donation Box', amount: 1800, date: '2024-10-01' },
      { source: 'GoFundMe Campaign', amount: 1700, date: '2024-10-15' },
    ],
    expenses: [
      { item: 'Plumbing supplies & fixtures', amount: 1200, date: '2024-10-20', receipt: 'Receipt #P001' },
      { item: 'Licensed plumber labor (2 days)', amount: 2300, date: '2024-10-25', receipt: 'Receipt #P002' },
    ],
    timeline: [
      { date: '2024-09-20', update: 'Pipe leak detected in men\'s wudu area. Temporary patch applied.' },
      { date: '2024-10-01', update: 'Fundraising started. Community generously responded within two weeks.' },
      { date: '2024-10-25', update: 'Repairs completed by licensed plumber. All wudu stations fully operational.' },
    ],
  },
  {
    id: 'classroom-renovation',
    title: 'Classroom Renovation',
    status: 'future',
    shortDescription:
      'Full renovation of the Islamic school classrooms including new flooring, lighting, and furniture for an improved learning environment.',
    goal: 12000,
    raised: 0,
    donationSources: [],
    expenses: [],
    timeline: [],
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

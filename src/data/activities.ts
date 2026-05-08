export interface ActivityItem {
  title: string
  description: string
  schedule?: string
  location?: string
}

export interface ActivitySection {
  id: string
  heading: string
  icon: string
  items: ActivityItem[]
}

export const activitySections: ActivitySection[] = [
  {
    id: 'quran-classes',
    heading: 'Quran Classes',
    icon: '📖',
    items: [
      {
        title: 'Children\'s Quran Circle',
        description: 'Weekly Quran recitation and tajweed lessons for children ages 6–14. Taught by qualified local instructors.',
        schedule: 'Saturdays, 10:00 AM – 12:00 PM',
        location: 'Classroom A',
      },
      {
        title: 'Adult Quran Study',
        description: 'Open to all adults. Covers proper recitation, basic tajweed rules, and selected tafsir. All levels welcome.',
        schedule: 'Sundays, 11:00 AM – 12:30 PM',
        location: 'Main Prayer Hall',
      },
      {
        title: 'Quran Memorization Program',
        description: 'Structured hifz program for committed students. Requires registration and attendance commitment.',
        schedule: 'Tuesday & Thursday evenings, 6:30 PM – 8:00 PM',
        location: 'Classroom B',
      },
    ],
  },
  {
    id: 'community-events',
    heading: 'Community Events',
    icon: '🤝',
    items: [
      {
        title: 'Friday Community Dinner',
        description: 'Monthly potluck dinner following Jumu\'ah prayer. Families bring dishes to share. A beloved tradition for building community bonds.',
        schedule: 'First Friday of each month, after Jumu\'ah',
        location: 'Community Hall',
      },
      {
        title: 'Eid Celebrations',
        description: 'Community-wide Eid al-Fitr and Eid al-Adha celebrations with prayer, festivities, and food for all families.',
        schedule: 'On each Eid day',
        location: 'Main Hall & Grounds',
      },
      {
        title: 'New Member Welcome',
        description: 'Informal gathering to welcome new members to the community. Includes an overview of ICM programs and opportunities.',
        schedule: 'Monthly — check announcements',
        location: 'Conference Room',
      },
    ],
  },
  {
    id: 'volunteer-work',
    heading: 'Volunteer Work',
    icon: '🛠️',
    items: [
      {
        title: 'Facility Maintenance Crew',
        description: 'Volunteers help with routine cleaning, minor repairs, and upkeep of the center facilities.',
        schedule: 'Every other Saturday, 9:00 AM',
        location: 'Islamic Center of Moscow',
      },
      {
        title: 'Food Bank Partnership',
        description: 'Monthly food drive in collaboration with the local food bank. Volunteers sort and distribute donations.',
        schedule: 'Last Saturday of each month',
        location: 'Food Bank — 123 Main St.',
      },
    ],
  },
  {
    id: 'youth-activities',
    heading: 'Youth Activities',
    icon: '⚽',
    items: [
      {
        title: 'Youth Sports League',
        description: 'Organized sports activities including soccer and basketball for teens. Promotes teamwork, fitness, and camaraderie.',
        schedule: 'Sundays, 2:00 PM – 4:00 PM',
        location: 'Moscow Community Park',
      },
      {
        title: 'Islamic Studies for Teens',
        description: 'Age-appropriate Islamic education covering fiqh, seerah, and contemporary Muslim issues. Led by youth-oriented instructors.',
        schedule: 'Saturdays, 1:00 PM – 2:30 PM',
        location: 'Classroom B',
      },
      {
        title: 'Youth Leadership Circle',
        description: 'A space for teens to develop leadership skills, plan community events, and participate in civic engagement.',
        schedule: 'Bi-weekly Fridays after Jumu\'ah',
        location: 'Conference Room',
      },
    ],
  },
  {
    id: 'future-announcements',
    heading: 'Coming Soon',
    icon: '📢',
    items: [
      {
        title: 'Arabic Language Course',
        description: 'Beginner and intermediate Arabic classes planned for the fall semester. Registration details will be announced.',
      },
      {
        title: 'Sisters\' Halaqa',
        description: 'A dedicated weekly circle for women covering Quranic study, hadith, and open discussion. Launch date TBD.',
      },
      {
        title: 'Community Garden Project',
        description: 'Plans underway for a small community garden at the center. Volunteers and ideas welcome — speak to the board.',
      },
    ],
  },
]

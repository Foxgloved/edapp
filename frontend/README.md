# Employee Education Platform - Frontend

Next.js 15 application with TypeScript and Tailwind CSS.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js app router
│   ├── dashboard/         # Dashboard page
│   ├── courses/           # Courses page
│   ├── schedule/          # Schedule page
│   ├── homework/          # Homework page
│   ├── leaderboard/       # Leaderboard page
│   ├── profile/           # Profile page
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── DashboardLayout.tsx
│   ├── Sidebar.tsx
│   └── Header.tsx
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
│   └── index.ts
└── public/               # Static assets
```

## Key Features

- **Dashboard** - Overview of learning progress
- **Courses** - Browse and manage enrolled courses
- **Schedule** - Calendar view of upcoming events
- **Homework** - Assignment management
- **Leaderboard** - Gamification and rankings
- **Profile** - User profile and achievements

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

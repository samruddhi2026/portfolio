# Samruddhi Magdum — AI/ML Engineer Portfolio

A modern, production-ready portfolio website built with Next.js 15, showcasing AI/ML projects, skills, certifications, and professional experience.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Contact Form:** EmailJS
- **Deployment:** Vercel Ready

## Features

- Dark mode default with premium SaaS design
- Fully responsive across all devices
- SEO optimized with metadata, sitemap, and robots.txt
- Glassmorphism sticky navbar with active section tracking
- Hero with typing animation and floating particles
- Timeline-style About section
- Animated skill cards with progress bars
- Project filtering with modal popups
- Certificate gallery with preview modals
- Auto-fetching GitHub stats and repositories
- PDF resume preview and download
- EmailJS contact form with validation
- Lighthouse score optimized (95+)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
cd D:\Portfolio
npm install
```

### Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Required variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
D:\Portfolio/
├── public/
│   ├── images/
│   │   ├── profile/          # Profile photo
│   │   ├── projects/         # Project thumbnails
│   │   └── certificates/     # Certificate images
│   ├── resume/                 # PDF resume
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO
│   │   ├── page.tsx            # Main page
│   │   ├── globals.css         # Global styles
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   └── robots.ts           # Dynamic robots
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Certifications.tsx
│   │   ├── GitHubSection.tsx
│   │   ├── Resume.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/                   # Static data files
│   └── lib/                    # Utilities and API helpers
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Customization

### Replace Placeholder Assets

1. **Profile Photo:** Replace `public/images/profile/profile.jpg`
2. **Project Images:** Replace files in `public/images/projects/`
3. **Certificates:** Replace files in `public/images/certificates/`
4. **Resume:** Replace `public/resume/Samruddhi_Magdum_Resume.pdf`

### Update Personal Info

Edit `src/data/site.ts` for contact details, social links, and site metadata.

### Update Projects & Skills

Edit `src/data/projects.ts` and `src/data/skills.ts` respectively.

## Deploy to Vercel

1. Push the project to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

## Color Palette

| Color      | Hex       |
|------------|-----------|
| Primary    | `#2563EB` |
| Secondary  | `#7C3AED` |
| Accent     | `#06B6D4` |
| Background | `#020617` |

## License

© 2026 Samruddhi Magdum. All rights reserved.

# SGPA Calculator — Free All-in-One GPA Tool Suite for Students

A fast, private, and free collection of academic grade calculators built with Next.js 16. Calculate your **SGPA**, **CGPA**, **GPA (4.0 scale)**, convert **SGPA to percentage** with official university formulas, and map **marks to letter grades** — all on one clean, mobile-friendly page.

## ✨ Tools Included

| Tool | What it does |
|------|--------------|
| **SGPA Calculator** | Credit-weighted semester GPA on the 10-point scale (O, A+, A, B+, B, C, P, F) with instant results, total credits & approximate percentage |
| **CGPA Calculator** | Cumulative GPA across semesters, weighted by each semester's credits |
| **GPA Calculator (4.0 Scale)** | US-style GPA for study-abroad applications with letter grades (A → F) |
| **SGPA to Percentage** | Official conversion formulas: Standard/AKTU (×10), CBSE/DU (×9.5), SPPU/VTU ((X−0.75)×10), GTU ((X−0.5)×10), Mumbai University (7.25X+11) |
| **Grade Calculator** | Convert obtained/total marks into overall percentage and 10-point letter grade |

## 🔑 Features

- ⚡ **Live results** — everything recalculates as you type, nothing to submit
- 🔒 **Private by design** — all calculations run in your browser; no data ever leaves your device
- 📱 **Mobile first** — responsive layout that works beside your marksheet on any screen
- 📚 **Human-written guides** — what SGPA is, the formula with a worked example, step-by-step instructions, the 10-point grading scale, percentage conversion guide, and pro tips
- ❓ **FAQ with schema** — 8 real student questions marked up with FAQPage structured data for SEO
- 🧭 **Semantic, accessible HTML** — proper landmarks, labels, ARIA attributes and keyboard navigation
- 📈 **SEO ready** — metadata, Open Graph, JSON-LD (WebApplication + FAQPage + Organization), robots.txt and sitemap.xml

## 🧮 The Formula

```
SGPA = Σ (Credits × Grade Point) ÷ Σ (Credits)
CGPA = Σ (Semester SGPA × Semester Credits) ÷ Σ (Semester Credits)
```

## 🚀 Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## 🛠️ Getting Started

```bash
# install dependencies
bun install   # or: npm install

# run the dev server
bun run dev   # or: npm run dev

# open http://localhost:3000
```

## ☁️ Deploy to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Vercel auto-detects Next.js — click **Deploy** (no environment variables needed)

Or use the CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## 📄 Pages & Legal

- **About Us** — the story and mission behind the tool
- **Contact Us** — form + direct email at **techsuli415502@gmail.com** (replies in 24–48 hours)
- **Privacy Policy** — plain-language policy covering the in-browser, no-tracking approach

## 🤝 Contributing

Found a formula that differs for your university? Open an issue or write to **techsuli415502@gmail.com** — every calculator here exists because a student asked for it.

---

© SGPACalculator. Results are indicative — always confirm with your institution's official academic regulations.

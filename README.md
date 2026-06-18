# CapacityBridge

> **Europe's faster way to source industrial metal 3D printing.**

CapacityBridge is an early-stage innovation project connecting engineering teams and companies with verified industrial metal additive manufacturing (AM) suppliers across Europe.

> ⚠️ **Early-stage prototype** — developed within the Technical University of Munich (TUM). Marketplace listings and supplier data are illustrative only. Do not upload commercially sensitive CAD files until the secure production environment is confirmed.

---

## What is CapacityBridge?

CapacityBridge helps engineering teams compare verified industrial metal AM suppliers based on:

- **Technology** — DMLS, SLM, LPBF, EBM, DED, Metal Binder Jetting
- **Materials** — Ti6Al4V, 316L, AlSi10Mg, Inconel, and more
- **Certifications** — ISO 9001, AS9100, ISO 13485, IATF 16949
- **Quality** — verified supplier scores and inspection capabilities
- **Lead time** — realistic production timelines
- **IP protection** — NDA workflows and controlled file access
- **Price** — structured, comparable quotations

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui (Radix UI) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Database | Supabase (PostgreSQL) |
| Build tool | Vite |
| Routing | React Router DOM |

---

## Project Structure

```
capacitybridge/
├── index.html                          # HTML entry point with SEO meta tags
├── package.json                        # Dependencies and scripts
├── vite.config.ts                      # Vite + path aliases
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.ts                  # Tailwind + brand colours
├── postcss.config.js                   # PostCSS config
├── .env.example                        # Environment variable template
│
├── supabase/
│   └── schema.sql                      # Full DB schema + RLS policies
│
└── src/
    ├── main.tsx                        # React entry point
    ├── App.tsx                         # Router + layout
    ├── index.css                       # Global styles + CSS variables
    │
    ├── lib/
    │   ├── supabase.ts                 # Supabase client + TypeScript types
    │   └── utils.ts                    # cn() utility function
    │
    ├── pages/
    │   ├── HomePage.tsx                # Main landing page
    │   ├── ForSuppliersPage.tsx        # Supplier landing + registration form
    │   └── AdminDashboard.tsx          # Protected admin dashboard
    │
    └── components/
        ├── Navbar.tsx                  # Sticky responsive navigation
        ├── Footer.tsx                  # Footer with links
        ├── PrototypeBanner.tsx         # Top prototype notice banner
        ├── HeroSection.tsx             # Hero + demo marketplace panel
        ├── HowItWorks.tsx              # 5-step process section
        ├── CustomerBenefits.tsx        # 6 benefit cards + tech grid
        ├── IPSecuritySection.tsx       # Security cards + confidentiality levels
        ├── EarlyAccessSection.tsx      # Lead capture form
        ├── AcademicContextSection.tsx  # TUM academic context
        ├── ProjectSubmissionForm.tsx   # 5-step customer project form (modal)
        └── ui/                         # shadcn/ui components
            ├── button.tsx
            ├── input.tsx
            ├── label.tsx
            ├── textarea.tsx
            ├── checkbox.tsx
            ├── select.tsx
            ├── toast.tsx
            ├── toaster.tsx
            └── use-toast.ts
```

---

## Database Schema

Six tables with Row Level Security (RLS):

| Table | Purpose | Public Access |
|---|---|---|
| `leads` | Early access interest registrations | INSERT only |
| `customer_projects` | Project submission interests | INSERT only |
| `suppliers` | Supplier applications | INSERT only |
| `supplier_machines` | Machine details per supplier | INSERT only |
| `supplier_services` | Services offered per supplier | INSERT only |
| `supplier_certifications` | Certifications per supplier | INSERT only |

**RLS Summary:**
- Anonymous users can INSERT (submit forms) but cannot READ other submissions
- Only authenticated admins can read, update, or manage all data
- No public reads on any sensitive table

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/Mabevilchez/capacitybridge.git
cd capacitybridge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Navigate to **SQL Editor** in your Supabase dashboard
3. Run the contents of `supabase/schema.sql`
4. Copy your **Project URL** and **anon public key** from **Settings > API**

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=choose-a-secure-password
```

### 5. Start the development server

```bash
npm run dev
```

The site runs at [http://localhost:5173](http://localhost:5173)

---

## Admin Dashboard

Navigate to `/admin` on the deployed site.

Enter the password set in `VITE_ADMIN_PASSWORD`.

The admin dashboard shows:
- **Leads** — early access interest submissions with status management
- **Projects** — customer project interests with status tracking
- **Suppliers** — supplier applications with verification status

Status options: New → Contacted → Interview Scheduled → Qualified → Pilot Candidate → Not Currently Relevant

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Add environment variables in the Vercel dashboard under **Settings > Environment Variables**.

### Netlify

```bash
npm run build
# Deploy the dist/ folder
```

Add environment variables in Netlify dashboard under **Site settings > Environment variables**.

---

## Security Notes

This is an **early-access prototype**. The following security features are **intended** but not yet fully production-hardened:

- Encrypted private storage bucket for CAD files (use Supabase Storage with private bucket)
- Short-lived signed URLs for file access
- Role-based access control via Supabase Auth
- Legally binding NDA workflow (manual process at this stage)

**Do not use this platform to store commercially sensitive CAD files until a full security audit is completed.**

---

## Brand Colours

| Colour | Hex |
|---|---|
| Navy | `#0F1F3D` |
| Primary Blue | `#1D4ED8` |
| Blue Background | `#EFF6FF` |
| Orange Accent | `#EA580C` |
| Orange Background | `#FFF7ED` |
| Security Green | `#059669` |
| Security Background | `#ECFDF5` |

---

## Academic Context

CapacityBridge is developed as an early-stage innovation project within the **Technical University of Munich (TUM)**. TUM is referenced as the academic context only and does not endorse CapacityBridge as an official university venture.

---

## Disclaimer

Marketplace information and supplier examples shown on this website are **illustrative only**. No claim is made that any company, supplier, customer, or institution is currently using this platform.

---

© 2024 CapacityBridge. Early-stage innovation project.

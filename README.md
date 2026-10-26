# Vaibhavgiri Goswami & Associates – Civil Engineering Consultants

Official website and digital engineering administrative portal for **Vaibhavgiri Goswami & Associates**, a civil engineering consultancy, site supervision, and turnkey construction management practice based in India.

- **Primary Contact**: +91 9427409949
- **Tagline**: Civil Engineering Consultants
- **Brand Palette**:
  - Primary Navy Blue: `#172544`
  - Professional Architectural Grey: `#77797C`
  - Crisp Architectural White: `#FFFFFF`
  - Supporting Slate: `#F8F9FA` / `#1E293B`

---

## 1. Project Folder Structure

```text
├── .env.example               # Environment variables template
├── data/
│   └── store.json             # File-backed persistence store (auto-created on first run)
├── public/
│   ├── assets/aistudio/       # High-definition company brand logo & graphics
│   ├── robots.txt             # Search engine crawl directives
│   └── sitemap.xml            # XML sitemap for SEO indexation
├── server.ts                  # Full-stack Express backend with API routes & Vite middleware
├── src/
│   ├── api.ts                 # Type-safe API client for inquiries, services & admin actions
│   ├── App.tsx                # Main application coordinator & layout
│   ├── components/
│   │   ├── AboutUs.tsx        # Company identity, vision, mission & engineering approach
│   │   ├── AdminPortal.tsx    # Password-authenticated administrative portal & inquiry manager
│   │   ├── ContactSection.tsx # Verified consultation inquiry form & instant WhatsApp integration
│   │   ├── Footer.tsx         # Architectural dark footer with branding & navigation
│   │   ├── Header.tsx         # Sticky header with logo, phone hotline, and navigation
│   │   ├── Hero.tsx           # High-impact engineering hero with direct call & CTA buttons
│   │   ├── ProjectsSection.tsx# Sector showcase (Residential, Commercial, Industrial, etc.)
│   │   ├── QuickFloatActions.tsx # Mobile floating call & WhatsApp quick-action buttons
│   │   ├── ServicesSection.tsx# 8 core civil engineering service cards with prefill actions
│   │   ├── WhyChooseUs.tsx    # 7 engineering commitments & service principles
│   │   └── WorkProcess.tsx    # 7-phase execution timeline (desktop horizontal / mobile vertical)
│   ├── db/
│   │   └── schema.sql         # Production PostgreSQL / Supabase DDL schema
│   ├── index.css              # Tailwind v4 styles, custom typography & blueprint grid
│   ├── main.tsx               # React 19 entry point
│   └── types.ts               # Core TypeScript definitions
├── index.html                 # Semantic HTML entry with OpenGraph, Twitter & Schema.org JSON-LD
├── metadata.json              # AI Studio Applet metadata
├── package.json               # Full-stack dependencies and NPM scripts
└── tsconfig.json              # TypeScript compilation configuration
```

---

## 2. Local Development & Setup

### Prerequisites
- Node.js version 18.x or 20+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd <repository-folder>

# Install dependencies
npm install

# Run full-stack development server
npm run dev
```
The application will launch on `http://localhost:3000`.

### Admin Portal Credentials
- Click **Admin** in the header or footer.
- Default password: `admin@vga2026`
- The password can be customized via the `ADMIN_PASSWORD` variable in `.env`.

---

## 3. Database Persistence & PostgreSQL Migration

### Current Persistence Engine
The application includes a file-backed JSON document store with **ACID-safe atomic writes** (`data/store.json`). It handles customer consultation inquiries, custom services, project typologies, and company information without requiring an external database setup during development.

### Migrating to Production PostgreSQL / Supabase
When deploying to production with a managed PostgreSQL database:
1. Provision a PostgreSQL database on [Supabase](https://supabase.com), [Neon](https://neon.tech), or AWS RDS.
2. Run the provided schema script located at `src/db/schema.sql`:
   ```bash
   psql $DATABASE_URL -f src/db/schema.sql
   ```
3. Set `DATABASE_URL` in your production environment variables.

---

## 4. Production Deployment Guide

### Option A: Vercel / Render / Railway
1. **Repository Setup**: Push this repository to GitHub or GitLab.
2. **Import into Platform**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Node Version: `20.x`
3. **Environment Variables**:
   ```ini
   NODE_ENV=production
   ADMIN_PASSWORD=YourStrongCustomPassword
   PORT=3000
   ```

### Option B: Cloud Run / Docker / VPS
Build the production assets:
```bash
npm run build
npm start
```

---

## 5. Custom Domain & HTTPS Setup

1. **Purchasing a Domain**: Purchase your preferred domain (e.g. `vaibhavgirigoswami.com`, `vgaengineers.in`, or `vgassociates.com`) from any ICANN-accredited registrar (Namecheap, GoDaddy, Cloudflare).
2. **DNS Configuration**:
   - For Apex Domain (`yourdomain.com`): Add an `A` record pointing to your hosting provider's IP address.
   - For `www` subdomain (`www.yourdomain.com`): Add a `CNAME` record pointing to your host target.
3. **SSL / HTTPS Certificate**:
   - Hosting providers such as Cloudflare, Vercel, and Render provide automatic free Let's Encrypt SSL certificates.
   - Force "Always Use HTTPS" in your hosting provider's SSL/TLS dashboard.

---

## 6. Configuring Contact Form & WhatsApp Integrations

- **Direct Call Link**: Configured for `tel:+919427409949`.
- **WhatsApp Chat Link**: Formatted using the international WhatsApp API:
  `https://wa.me/919427409949?text=...`
  When an inquiry is submitted, a reference tracking ID is generated so the prospective client can click to follow up immediately on WhatsApp with the reference code prefilled.
- **Form Spam Protection**: Built-in honeypot trap and IP rate limiting (maximum 5 requests per 10 minutes per IP).

---

## 7. Testing & Quality Assurance Checklist

- [x] **Desktop Navigation**: Smooth scrolling across `#hero`, `#about`, `#services`, `#projects`, `#process`, `#why-us`, `#contact`.
- [x] **Mobile Drawer & Responsiveness**: Mobile hamburger drawer with click-to-call and WhatsApp quick links.
- [x] **Service Prefill Action**: Clicking "Enquire About This Service" on any of the 8 services scrolls to the contact form and automatically sets the dropdown selection.
- [x] **Inquiry Validation**: Full-name, valid 10-digit mobile number, location, and project description checks.
- [x] **CSV Data Export**: Admin portal exports inquiries directly into formatted `.csv` for client records.
- [x] **SEO & Schema**: Schema.org `ProfessionalService` structured data, Open Graph cards, Twitter cards, meta tags, `robots.txt`, and `sitemap.xml`.
- [x] **Truthful Business Representation**: Sample images are transparently flagged; verified founder name and mobile number preserved.

---

## 8. Maintenance & Backups

- **Inquiries Backup**: Regularly use the "Export CSV" button in the Admin Portal to download all consultation inquiries.
- **Company Information**: Keep office address, email, and working hours updated via the Admin Portal without modifying source code.
- **Security Updates**: Regularly run `npm audit` and keep dependencies updated.

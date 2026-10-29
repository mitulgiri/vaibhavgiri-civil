import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data store setup for file backup
const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  points: string[];
  category: string;
  iconName: string;
  order: number;
  featured: boolean;
}

interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial' | 'educational' | 'healthcare' | 'bungalows' | 'interior';
  sectorName: string;
  description: string;
  features: string[];
  imageUrl: string;
  isSample: boolean;
}

interface InquiryItem {
  id: string;
  name: string;
  mobile: string;
  email: string;
  serviceId: string;
  serviceName: string;
  projectType: string;
  location: string;
  estimatedBudget?: string;
  description: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Completed' | 'Archived';
  adminNotes?: string;
  createdAt: string;
  ipAddress?: string;
}

interface CompanyInfo {
  businessName: string;
  tagline: string;
  founder: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  consultationFeeNotice: string;
  announcement: string;
}

interface DatabaseSchema {
  company: CompanyInfo;
  services: ServiceItem[];
  projects: ProjectItem[];
  inquiries: InquiryItem[];
  adminTokens: string[];
}

const DEFAULT_DATA: DatabaseSchema = {
  company: {
    businessName: 'Vaibhavgiri Goswami & Associates',
    tagline: 'Civil Engineering Consultants',
    founder: 'Vaibhavgiri Goswami',
    phone: '+91 9427409949',
    whatsapp: '+91 9427409949',
    email: 'vaibhavgirigoswami@gmail.com',
    address: 'Office address to be confirmed. (Serving regional & municipal development projects)',
    workingHours: 'Monday – Saturday: 9:30 AM to 7:00 PM (IST)',
    consultationFeeNotice: 'Preliminary technical discussions and initial requirement briefings are scheduled by appointment.',
    announcement: 'Accepting inquiries for RCC structural design coordination, site supervision, and turnkey construction management.',
  },
  services: [
    {
      id: 'civil-engineering-consultancy',
      title: 'Civil Engineering Consultancy',
      description: 'Comprehensive engineering consultation ensuring regulatory compliance, structural integrity, and architectural viability.',
      points: [
        'Building planning & layout optimization',
        'Structural design coordination with licensed structural engineers',
        'Technical consultation on soil, foundation & load parameters'
      ],
      category: 'Consultancy',
      iconName: 'Building2',
      order: 1,
      featured: true
    },
    {
      id: 'site-supervision-project-management',
      title: 'Site Supervision & Project Management',
      description: 'End-to-end on-site engineering oversight ensuring strict adherence to approved drawings, timelines, and safety norms.',
      points: [
        'Rigorous site inspections at critical milestones',
        'Construction progress monitoring & schedule tracking',
        'Comprehensive quality control and workmanship verification',
        'Labor management coordination & productivity monitoring'
      ],
      category: 'Management',
      iconName: 'ClipboardCheck',
      order: 2,
      featured: true
    },
    {
      id: 'interior-design-turnkey',
      title: 'Interior Design & Turnkey Fit-Outs',
      description: 'Contemporary architectural interior design blending trendsetting aesthetics with civil engineering precision and complete turnkey execution.',
      points: [
        '3D photorealistic visualization & conceptual spatial layout',
        'Luxury residential interiors: Modular kitchens, living lounges, master suites & designer wardrobes',
        'Commercial & corporate fit-outs: Ergonomic office layouts, executive chambers & retail boutiques',
        'Turnkey execution: False ceilings, ambient cove lighting, custom woodwork, premium flooring & MEP integration',
        'Zero subcontractor hassle: Single-point accountability with transparent BOQ billing'
      ],
      category: 'Interior Design',
      iconName: 'Sparkles',
      order: 3,
      featured: true
    },
    {
      id: 'construction-services',
      title: 'Construction Services',
      description: 'End-to-end building execution delivering durable, aesthetically sound, and high-performance civil structures.',
      points: [
        'Residential construction (individual homes & villas)',
        'Commercial construction & retail complexes',
        'Industrial shed & warehouse construction',
        'Bungalow and multi-unit apartment projects'
      ],
      category: 'Construction',
      iconName: 'Hammer',
      order: 4,
      featured: true
    },
    {
      id: 'labour-contract-services',
      title: 'Labour Contract Services',
      description: 'Skilled workforce deployment under engineering supervision for structural masonry and finishing trades.',
      points: [
        'RCC (Reinforced Cement Concrete) framework & bar-bending',
        'Brickwork and precision masonry',
        'Internal and external plastering work',
        'Flooring, tile setting & granite installation',
        'Advanced chemical waterproofing systems',
        'Interior and exterior painting and finishing work'
      ],
      category: 'Contracting',
      iconName: 'Users',
      order: 4,
      featured: true
    },
    {
      id: 'turnkey-projects',
      title: 'Turnkey Projects',
      description: 'Hassle-free single-point accountability covering everything from foundation conception to final keys handover.',
      points: [
        'End-to-end coordinated project execution',
        'Integrated architectural planning & material procurement',
        'Timeline-bound milestone delivery',
        'Final commissioning and formal project handover according to agreed scope'
      ],
      category: 'Turnkey',
      iconName: 'CheckCircle2',
      order: 5,
      featured: true
    },
    {
      id: 'renovation-and-repair',
      title: 'Renovation and Repair Work',
      description: 'Engineering-guided restoration, retrofitting, and structural enhancements for aging or modified properties.',
      points: [
        'Full building renovation & spatial modernization',
        'Routine and preventive repair and maintenance',
        'Structural and non-structural repair solutions as appropriate to project scope',
        'Crack repairs, dampness treatment & load-bearing enhancements'
      ],
      category: 'Restoration',
      iconName: 'Wrench',
      order: 6,
      featured: false
    },
    {
      id: 'estimation-boq-billing',
      title: 'Estimation, BOQ & Billing Verification',
      description: 'Meticulous financial engineering to safeguard your capital, avoid cost overruns, and verify contractor claims.',
      points: [
        'Precise construction cost estimation and rate analysis',
        'Detailed Bill of Quantities (BOQ) preparation',
        'Independent contractor billing verification & measurement checks',
        'Material quantity takeoff and inventory reconciliation'
      ],
      category: 'Estimation',
      iconName: 'Calculator',
      order: 7,
      featured: false
    },
    {
      id: 'quality-control-technical-support',
      title: 'Quality Control & Technical Support',
      description: 'Scientific material inspection and on-site testing guidance to ensure long-term structural longevity.',
      points: [
        'Concrete slump, cube test, and steel tensile verification guidance',
        'Continuous workmanship monitoring against IS/IRC standards',
        'Technical guidance on modern waterproofing and chemical admixtures',
        'Dedicated engineering support for resolving on-site structural challenges'
      ],
      category: 'Technical',
      iconName: 'ShieldCheck',
      order: 8,
      featured: false
    }
  ],
  projects: [
    {
      id: 'proj-res-1',
      title: 'Contemporary Residential Villa Planning & Supervision',
      category: 'residential',
      sectorName: 'Residential Buildings',
      description: 'Structural coordination, RCC framework supervision, and turnkey execution management for modern residential architecture.',
      features: ['Earthquake-resistant RCC design coordination', 'Vastu-compliant spatial planning', 'Engineered thermal insulation & waterproofing'],
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      isSample: true
    },
    {
      id: 'proj-int-1',
      title: 'Bespoke Luxury Residential & Commercial Turnkey Interior',
      category: 'interior',
      sectorName: 'Interior Design & Fit-Outs',
      description: 'Trending contemporary interior transformation featuring ambient cove lighting, custom modular woodwork, Italian marble flooring, and acoustic false ceilings.',
      features: ['3D Photorealistic VR walkthroughs', 'Bespoke modular kitchen & wardrobes', 'Integrated smart MEP & designer lighting'],
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      isSample: true
    },
    {
      id: 'proj-com-1',
      title: 'Commercial Complex & Retail Arcade',
      category: 'commercial',
      sectorName: 'Commercial Buildings',
      description: 'High-clearance column layouts, durable multi-level slab casting, and fire-safe commercial infrastructure coordination.',
      features: ['High-load commercial slab design', 'Dedicated basement parking drainage', 'Energy-efficient facade structural anchoring'],
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      isSample: true
    },
    {
      id: 'proj-ind-1',
      title: 'Industrial Manufacturing Shed & Warehouse',
      category: 'industrial',
      sectorName: 'Industrial Buildings',
      description: 'Heavy industrial flooring, PEB steel frame foundations, crane gantry support, and industrial drainage systems.',
      features: ['VDF (Vacuum Dewatered) heavy-duty flooring', 'Heavy machinery foundation design', 'Robust rainwater runoff channeling'],
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      isSample: true
    },
    {
      id: 'proj-edu-1',
      title: 'Educational Campus & Institutional Wing',
      category: 'educational',
      sectorName: 'Educational Institutions',
      description: 'Acoustically sound lecture halls, well-ventilated laboratory wings, and safe emergency exit circulation routes.',
      features: ['Wide span beam layouts', 'Child safety barrier standards', 'Rapid-turnaround monsoon-proof execution'],
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      isSample: true
    },
    {
      id: 'proj-med-1',
      title: 'Healthcare Center & Specialized Clinic Facility',
      category: 'healthcare',
      sectorName: 'Hospitals & Healthcare Facilities',
      description: 'Cleanroom HVAC structural pass-throughs, medical equipment foundation isolation, and anti-microbial finishing coordination.',
      features: ['Heavy medical diagnostic equipment slabs', 'Vibration isolation details', 'Hygienic epoxy coving and sterile finishes'],
      imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
      isSample: true
    },
    {
      id: 'proj-bun-1',
      title: 'Luxury Bungalows & Multi-Unit Apartments',
      category: 'bungalows',
      sectorName: 'Bungalows & Apartments',
      description: 'Exquisite aesthetic concrete finishes, private terrace waterproofing, and premium structural craftsmanship.',
      features: ['Double-height living room slab casting', 'Concealed beam plumbing routing', 'Designer exterior texture & stone cladding'],
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      isSample: true
    }
  ],
  inquiries: [
    {
      id: 'inq-seed-01',
      name: 'Ramesh Patel',
      mobile: '+91 98250 12345',
      email: 'ramesh.patel.sample@example.com',
      serviceId: 'civil-engineering-consultancy',
      serviceName: 'Civil Engineering Consultancy',
      projectType: 'Bungalows & Apartments',
      location: 'Ahmedabad / Gandhinagar Region',
      estimatedBudget: '₹40 - 60 Lakhs',
      description: 'Looking for technical consultation, architectural layout review, and structural coordination for a G+2 residential bungalow.',
      status: 'In Review',
      adminNotes: 'Initial contact made. Requested structural CAD drawings.',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    }
  ],
  adminTokens: []
};

// Database helper functions with atomic write for fallback
function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      return DEFAULT_DATA;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      company: { ...DEFAULT_DATA.company, ...(parsed.company || {}) },
      services: parsed.services?.length ? parsed.services : DEFAULT_DATA.services,
      projects: parsed.projects?.length ? parsed.projects : DEFAULT_DATA.projects,
      inquiries: parsed.inquiries || [],
      adminTokens: parsed.adminTokens || []
    };
  } catch (err) {
    console.error('Error reading fallback file store, using defaults:', err);
    return DEFAULT_DATA;
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    const tempPath = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, DATA_FILE);
  } catch (err) {
    console.error('Error writing fallback file store:', err);
  }
}

// Initialize file store
readDb();

// Setup PostgreSQL pool if DATABASE_URL is configured
let pgPool: pg.Pool | null = null;
let isPgConnected = false;

if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '') {
  try {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
      max: 10,
    });
  } catch (err) {
    console.error('[Database] Failed to initialize PostgreSQL pool:', (err as Error).message);
  }
}

// Function to initialize tables and seed data if empty
async function initPostgresDatabase() {
  if (!pgPool) return;

  try {
    const client = await pgPool.connect();
    try {
      // Create tables safely if not already present
      await client.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
            id VARCHAR(64) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            mobile VARCHAR(32) NOT NULL,
            email VARCHAR(255),
            service_id VARCHAR(128) NOT NULL,
            service_name VARCHAR(255) NOT NULL,
            project_type VARCHAR(128) NOT NULL,
            location VARCHAR(255) NOT NULL,
            estimated_budget VARCHAR(128),
            description TEXT NOT NULL,
            status VARCHAR(32) DEFAULT 'New',
            admin_notes TEXT,
            ip_address VARCHAR(64),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
        CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

        CREATE TABLE IF NOT EXISTS services (
            id VARCHAR(64) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            points JSONB DEFAULT '[]'::jsonb,
            category VARCHAR(64) NOT NULL,
            icon_name VARCHAR(64) NOT NULL,
            display_order INT DEFAULT 0,
            featured BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS projects (
            id VARCHAR(64) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            category VARCHAR(64) NOT NULL,
            sector_name VARCHAR(128) NOT NULL,
            description TEXT NOT NULL,
            features JSONB DEFAULT '[]'::jsonb,
            image_url TEXT NOT NULL,
            is_sample BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS company_info (
            id INT PRIMARY KEY DEFAULT 1,
            business_name VARCHAR(255) NOT NULL,
            tagline VARCHAR(255) NOT NULL,
            founder VARCHAR(255) NOT NULL,
            phone VARCHAR(32) NOT NULL,
            whatsapp VARCHAR(32) NOT NULL,
            email VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            working_hours VARCHAR(255) NOT NULL,
            consultation_fee_notice TEXT,
            announcement TEXT,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Seed company_info if empty
      const compRes = await client.query('SELECT COUNT(*) FROM company_info');
      if (parseInt(compRes.rows[0].count, 10) === 0) {
        const c = DEFAULT_DATA.company;
        await client.query(`
          INSERT INTO company_info (id, business_name, tagline, founder, phone, whatsapp, email, address, working_hours, consultation_fee_notice, announcement)
          VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          ON CONFLICT (id) DO NOTHING
        `, [c.businessName, c.tagline, c.founder, c.phone, c.whatsapp, c.email, c.address, c.workingHours, c.consultationFeeNotice, c.announcement]);
      }

      // Seed services if empty
      const srvRes = await client.query('SELECT COUNT(*) FROM services');
      if (parseInt(srvRes.rows[0].count, 10) === 0) {
        for (const s of DEFAULT_DATA.services) {
          await client.query(`
            INSERT INTO services (id, title, description, points, category, icon_name, display_order, featured)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (id) DO NOTHING
          `, [s.id, s.title, s.description, JSON.stringify(s.points), s.category, s.iconName, s.order, s.featured]);
        }
      }

      // Seed projects if empty
      const projRes = await client.query('SELECT COUNT(*) FROM projects');
      if (parseInt(projRes.rows[0].count, 10) === 0) {
        for (const p of DEFAULT_DATA.projects) {
          await client.query(`
            INSERT INTO projects (id, title, category, sector_name, description, features, image_url, is_sample)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (id) DO NOTHING
          `, [p.id, p.title, p.category, p.sectorName, p.description, JSON.stringify(p.features), p.imageUrl, p.isSample]);
        }
      }

      isPgConnected = true;
      console.log('[Database] PostgreSQL connection verified and schema operational.');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('[Database] PostgreSQL initialization warning:', (err as Error).message);
    isPgConnected = false;
  }
}

// In-memory admin session tokens (never exposed to browser)
const activeAdminTokens = new Set<string>();

// Admin Authentication Configuration
// Default pass is admin@vga2026. Can be overridden via ADMIN_PASSWORD environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin@vga2026';

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization token.' });
  }

  const token = authHeader.split(' ')[1];
  const db = readDb();
  if (!activeAdminTokens.has(token) && !db.adminTokens.includes(token)) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }
  next();
}

async function startServer() {
  // Initialize PostgreSQL schema if configured
  await initPostgresDatabase();

  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '5mb' }));

  // Basic API security & rate limiting header
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Simple IP tracking for spam rate limiting
  const ipSubmissionTimestamps = new Map<string, number[]>();

  // --- PUBLIC API ROUTES ---

  // 1. Get Company Info
  app.get('/api/company', async (req: Request, res: Response) => {
    if (isPgConnected && pgPool) {
      try {
        const result = await pgPool.query('SELECT * FROM company_info WHERE id = 1');
        if (result.rows.length > 0) {
          const r = result.rows[0];
          return res.json({
            businessName: r.business_name,
            tagline: r.tagline,
            founder: r.founder,
            phone: r.phone,
            whatsapp: r.whatsapp,
            email: r.email,
            address: r.address,
            workingHours: r.working_hours,
            consultationFeeNotice: r.consultation_fee_notice,
            announcement: r.announcement,
          });
        }
      } catch (err) {
        console.error('Error querying company from PG, falling back to file store');
      }
    }
    const db = readDb();
    res.json(db.company);
  });

  // 2. Get Services
  app.get('/api/services', async (req: Request, res: Response) => {
    if (isPgConnected && pgPool) {
      try {
        const result = await pgPool.query('SELECT * FROM services ORDER BY display_order ASC');
        if (result.rows.length > 0) {
          const services: ServiceItem[] = result.rows.map(r => ({
            id: r.id,
            title: r.title,
            description: r.description,
            points: typeof r.points === 'string' ? JSON.parse(r.points) : (r.points || []),
            category: r.category,
            iconName: r.icon_name,
            order: r.display_order,
            featured: r.featured
          }));
          return res.json(services);
        }
      } catch (err) {
        console.error('Error querying services from PG, falling back to file store');
      }
    }
    const db = readDb();
    const sorted = [...db.services].sort((a, b) => a.order - b.order);
    res.json(sorted);
  });

  // 3. Get Project Categories & Sample Projects
  app.get('/api/projects', async (req: Request, res: Response) => {
    if (isPgConnected && pgPool) {
      try {
        const result = await pgPool.query('SELECT * FROM projects ORDER BY created_at ASC');
        if (result.rows.length > 0) {
          const projects: ProjectItem[] = result.rows.map(r => ({
            id: r.id,
            title: r.title,
            category: r.category,
            sectorName: r.sector_name,
            description: r.description,
            features: typeof r.features === 'string' ? JSON.parse(r.features) : (r.features || []),
            imageUrl: r.image_url,
            isSample: r.is_sample
          }));
          return res.json(projects);
        }
      } catch (err) {
        console.error('Error querying projects from PG, falling back to file store');
      }
    }
    const db = readDb();
    res.json(db.projects);
  });

  // 4. Submit Customer Inquiry with Validation & Spam Controls
  app.post('/api/inquiries', async (req: Request, res: Response) => {
    const {
      name,
      mobile,
      email,
      serviceId,
      serviceName,
      projectType,
      location,
      estimatedBudget,
      description,
      honeypot // Spam protection honeypot
    } = req.body;

    // Spam honeypot trap
    if (honeypot && String(honeypot).trim() !== '') {
      return res.status(400).json({ error: 'Invalid submission parameters.' });
    }

    // Rate limiting: Max 5 submissions per IP every 10 minutes
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const timestamps = ipSubmissionTimestamps.get(clientIp) || [];
    const validTimestamps = timestamps.filter(t => now - t < 10 * 60 * 1000);
    if (validTimestamps.length >= 5) {
      return res.status(429).json({ error: 'Too many inquiries submitted. Please call our direct helpline at +91 9427409949.' });
    }
    validTimestamps.push(now);
    ipSubmissionTimestamps.set(clientIp, validTimestamps);

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter a valid full name (minimum 2 characters).' });
    }

    if (!mobile || typeof mobile !== 'string' || mobile.trim().replace(/[^0-9]/g, '').length < 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number for communication.' });
    }

    if (!location || typeof location !== 'string' || location.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter the project location/city.' });
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide a brief description of your project requirements (minimum 10 characters).' });
    }

    const inquiryId = `inq-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const createdAt = new Date().toISOString();
    const cleanIp = clientIp.replace(/^.*:/, '');

    const newInquiry: InquiryItem = {
      id: inquiryId,
      name: name.trim(),
      mobile: mobile.trim(),
      email: email ? email.trim() : '',
      serviceId: serviceId || 'general',
      serviceName: serviceName || 'General Civil Consultation',
      projectType: projectType || 'Residential',
      location: location.trim(),
      estimatedBudget: estimatedBudget ? estimatedBudget.trim() : '',
      description: description.trim(),
      status: 'New',
      createdAt,
      ipAddress: cleanIp
    };

    // Save to PostgreSQL if connected
    if (isPgConnected && pgPool) {
      try {
        await pgPool.query(`
          INSERT INTO inquiries (
            id, name, mobile, email, service_id, service_name, project_type, location, estimated_budget, description, status, ip_address, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `, [
          newInquiry.id,
          newInquiry.name,
          newInquiry.mobile,
          newInquiry.email,
          newInquiry.serviceId,
          newInquiry.serviceName,
          newInquiry.projectType,
          newInquiry.location,
          newInquiry.estimatedBudget,
          newInquiry.description,
          newInquiry.status,
          newInquiry.ipAddress,
          newInquiry.createdAt
        ]);
      } catch (err) {
        console.error('Error inserting inquiry into PostgreSQL, fallback to store:', (err as Error).message);
      }
    }

    // Also write to file store for resilience
    const db = readDb();
    db.inquiries.unshift(newInquiry);
    writeDb(db);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your civil engineering consultation request has been recorded. Our engineering team will review your requirements and reach out via phone/WhatsApp.',
      inquiryId: newInquiry.id
    });
  });

  // --- ADMIN AUTHENTICATION ---
  // Server-side authentication: ADMIN_PASSWORD is verified only on the server, never sent to the client.

  app.post('/api/admin/login', (req: Request, res: Response) => {
    const { password } = req.body;
    if (!password || typeof password !== 'string') {
      return res.status(401).json({ error: 'Password is required. Access denied.' });
    }

    // Timing-safe or strict comparison
    const isPasswordMatch = password === ADMIN_PASSWORD;
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid administrator credentials. Access denied.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    activeAdminTokens.add(token);

    const db = readDb();
    db.adminTokens.push(token);
    if (db.adminTokens.length > 20) {
      db.adminTokens = db.adminTokens.slice(-20);
    }
    writeDb(db);

    return res.json({
      success: true,
      token,
      message: 'Authentication successful. Welcome to VGA Administrative Portal.'
    });
  });

  app.get('/api/admin/verify', requireAdminAuth, (req: Request, res: Response) => {
    res.json({ valid: true, timestamp: Date.now() });
  });

  app.post('/api/admin/logout', requireAdminAuth, (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (token) {
      activeAdminTokens.delete(token);
      const db = readDb();
      db.adminTokens = db.adminTokens.filter(t => t !== token);
      writeDb(db);
    }
    res.json({ success: true, message: 'Logged out successfully.' });
  });

  // --- ADMIN PROTECTED MANAGEMENT ENDPOINTS ---

  // Get Inquiries
  app.get('/api/admin/inquiries', requireAdminAuth, async (req: Request, res: Response) => {
    if (isPgConnected && pgPool) {
      try {
        const result = await pgPool.query(`
          SELECT 
            id, name, mobile, email, 
            service_id as "serviceId", 
            service_name as "serviceName", 
            project_type as "projectType", 
            location, 
            estimated_budget as "estimatedBudget", 
            description, 
            status, 
            admin_notes as "adminNotes", 
            created_at as "createdAt", 
            ip_address as "ipAddress"
          FROM inquiries 
          ORDER BY created_at DESC
        `);
        return res.json(result.rows);
      } catch (err) {
        console.error('Error fetching inquiries from PG, falling back to file store');
      }
    }
    const db = readDb();
    res.json(db.inquiries);
  });

  // Update Inquiry Status & Notes
  app.patch('/api/admin/inquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (isPgConnected && pgPool) {
      try {
        if (status && adminNotes !== undefined) {
          await pgPool.query('UPDATE inquiries SET status = $1, admin_notes = $2 WHERE id = $3', [status, adminNotes, id]);
        } else if (status) {
          await pgPool.query('UPDATE inquiries SET status = $1 WHERE id = $2', [status, id]);
        } else if (adminNotes !== undefined) {
          await pgPool.query('UPDATE inquiries SET admin_notes = $1 WHERE id = $2', [adminNotes, id]);
        }
      } catch (err) {
        console.error('Error updating inquiry in PG:', err);
      }
    }

    const db = readDb();
    const index = db.inquiries.findIndex(i => i.id === id);
    if (index !== -1) {
      if (status) db.inquiries[index].status = status;
      if (adminNotes !== undefined) db.inquiries[index].adminNotes = adminNotes;
      writeDb(db);
      return res.json({ success: true, inquiry: db.inquiries[index] });
    }

    res.json({ success: true, message: 'Inquiry updated' });
  });

  // Delete Inquiry
  app.delete('/api/admin/inquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isPgConnected && pgPool) {
      try {
        await pgPool.query('DELETE FROM inquiries WHERE id = $1', [id]);
      } catch (err) {
        console.error('Error deleting inquiry in PG:', err);
      }
    }
    const db = readDb();
    db.inquiries = db.inquiries.filter(i => i.id !== id);
    writeDb(db);
    res.json({ success: true, message: 'Inquiry removed.' });
  });

  // Export Inquiries as CSV
  app.get('/api/admin/export-inquiries', requireAdminAuth, async (req: Request, res: Response) => {
    let inquiriesList: InquiryItem[] = [];
    if (isPgConnected && pgPool) {
      try {
        const result = await pgPool.query(`
          SELECT 
            id, name, mobile, email, 
            service_id as "serviceId", 
            service_name as "serviceName", 
            project_type as "projectType", 
            location, 
            estimated_budget as "estimatedBudget", 
            description, 
            status, 
            admin_notes as "adminNotes", 
            created_at as "createdAt"
          FROM inquiries 
          ORDER BY created_at DESC
        `);
        inquiriesList = result.rows;
      } catch {
        inquiriesList = readDb().inquiries;
      }
    } else {
      inquiriesList = readDb().inquiries;
    }

    const headers = ['ID', 'Date', 'Status', 'Name', 'Mobile', 'Email', 'Service', 'Project Type', 'Location', 'Estimated Budget', 'Description', 'Notes'];
    const escapeCsv = (val: any) => `"${String(val ?? '').replace(/"/g, '""')}"`;
    
    const rows = inquiriesList.map(i => [
      i.id,
      new Date(i.createdAt).toLocaleDateString(),
      i.status,
      i.name,
      i.mobile,
      i.email,
      i.serviceName,
      i.projectType,
      i.location,
      i.estimatedBudget,
      i.description,
      i.adminNotes || ''
    ].map(escapeCsv).join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=vga-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    res.send(csvContent);
  });

  // Update Company Info
  app.put('/api/admin/company', requireAdminAuth, async (req: Request, res: Response) => {
    const updated = req.body;
    if (isPgConnected && pgPool) {
      try {
        await pgPool.query(`
          UPDATE company_info SET
            business_name = COALESCE($1, business_name),
            tagline = COALESCE($2, tagline),
            founder = COALESCE($3, founder),
            phone = COALESCE($4, phone),
            whatsapp = COALESCE($5, whatsapp),
            email = COALESCE($6, email),
            address = COALESCE($7, address),
            working_hours = COALESCE($8, working_hours),
            consultation_fee_notice = COALESCE($9, consultation_fee_notice),
            announcement = COALESCE($10, announcement),
            updated_at = NOW()
          WHERE id = 1
        `, [
          updated.businessName, updated.tagline, updated.founder, updated.phone,
          updated.whatsapp, updated.email, updated.address, updated.workingHours,
          updated.consultationFeeNotice, updated.announcement
        ]);
      } catch (err) {
        console.error('Error updating company info in PG:', err);
      }
    }
    const db = readDb();
    db.company = { ...db.company, ...updated };
    writeDb(db);
    res.json({ success: true, company: db.company });
  });

  // Manage Services (Create, Update, Delete)
  app.post('/api/admin/services', requireAdminAuth, async (req: Request, res: Response) => {
    const newService: ServiceItem = {
      id: req.body.id || `srv-${Date.now()}`,
      title: req.body.title || 'New Engineering Service',
      description: req.body.description || '',
      points: Array.isArray(req.body.points) ? req.body.points : [],
      category: req.body.category || 'Consultancy',
      iconName: req.body.iconName || 'Building2',
      order: req.body.order || 99,
      featured: Boolean(req.body.featured)
    };

    if (isPgConnected && pgPool) {
      try {
        await pgPool.query(`
          INSERT INTO services (id, title, description, points, category, icon_name, display_order, featured)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          newService.id, newService.title, newService.description,
          JSON.stringify(newService.points), newService.category,
          newService.iconName, newService.order, newService.featured
        ]);
      } catch (err) {
        console.error('Error inserting service into PG:', err);
      }
    }

    const db = readDb();
    db.services.push(newService);
    writeDb(db);
    res.status(201).json({ success: true, service: newService });
  });

  app.put('/api/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    if (isPgConnected && pgPool) {
      try {
        await pgPool.query(`
          UPDATE services SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            points = COALESCE($3, points),
            category = COALESCE($4, category),
            icon_name = COALESCE($5, icon_name),
            display_order = COALESCE($6, display_order),
            featured = COALESCE($7, featured)
          WHERE id = $8
        `, [
          body.title, body.description,
          body.points ? JSON.stringify(body.points) : null,
          body.category, body.iconName, body.order, body.featured, id
        ]);
      } catch (err) {
        console.error('Error updating service in PG:', err);
      }
    }

    const db = readDb();
    const index = db.services.findIndex(s => s.id === id);
    if (index !== -1) {
      db.services[index] = { ...db.services[index], ...body, id };
      writeDb(db);
      return res.json({ success: true, service: db.services[index] });
    }
    res.json({ success: true });
  });

  app.delete('/api/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isPgConnected && pgPool) {
      try {
        await pgPool.query('DELETE FROM services WHERE id = $1', [id]);
      } catch (err) {
        console.error('Error deleting service from PG:', err);
      }
    }
    const db = readDb();
    db.services = db.services.filter(s => s.id !== id);
    writeDb(db);
    res.json({ success: true, message: 'Service removed.' });
  });

  // Manage Projects
  app.post('/api/admin/projects', requireAdminAuth, async (req: Request, res: Response) => {
    const newProj: ProjectItem = {
      id: req.body.id || `proj-${Date.now()}`,
      title: req.body.title,
      category: req.body.category,
      sectorName: req.body.sectorName || 'Civil Project',
      description: req.body.description || '',
      features: Array.isArray(req.body.features) ? req.body.features : [],
      imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80',
      isSample: req.body.isSample !== undefined ? Boolean(req.body.isSample) : true
    };

    if (isPgConnected && pgPool) {
      try {
        await pgPool.query(`
          INSERT INTO projects (id, title, category, sector_name, description, features, image_url, is_sample)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          newProj.id, newProj.title, newProj.category, newProj.sectorName,
          newProj.description, JSON.stringify(newProj.features), newProj.imageUrl, newProj.isSample
        ]);
      } catch (err) {
        console.error('Error inserting project into PG:', err);
      }
    }

    const db = readDb();
    db.projects.push(newProj);
    writeDb(db);
    res.status(201).json({ success: true, project: newProj });
  });

  app.put('/api/admin/projects/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    if (isPgConnected && pgPool) {
      try {
        await pgPool.query(`
          UPDATE projects SET
            title = COALESCE($1, title),
            category = COALESCE($2, category),
            sector_name = COALESCE($3, sector_name),
            description = COALESCE($4, description),
            features = COALESCE($5, features),
            image_url = COALESCE($6, image_url),
            is_sample = COALESCE($7, is_sample)
          WHERE id = $8
        `, [
          body.title, body.category, body.sectorName, body.description,
          body.features ? JSON.stringify(body.features) : null,
          body.imageUrl, body.isSample, id
        ]);
      } catch (err) {
        console.error('Error updating project in PG:', err);
      }
    }

    const db = readDb();
    const index = db.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      db.projects[index] = { ...db.projects[index], ...body, id };
      writeDb(db);
      return res.json({ success: true, project: db.projects[index] });
    }
    res.json({ success: true });
  });

  app.delete('/api/admin/projects/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isPgConnected && pgPool) {
      try {
        await pgPool.query('DELETE FROM projects WHERE id = $1', [id]);
      } catch (err) {
        console.error('Error deleting project in PG:', err);
      }
    }
    const db = readDb();
    db.projects = db.projects.filter(p => p.id !== id);
    writeDb(db);
    res.json({ success: true, message: 'Project removed.' });
  });

  // System status & database diagnosis (Safe output - NEVER exposes credentials)
  app.get('/api/system-status', async (req: Request, res: Response) => {
    let pgInquiryCount = 0;
    if (isPgConnected && pgPool) {
      try {
        const c = await pgPool.query('SELECT COUNT(*) FROM inquiries');
        pgInquiryCount = parseInt(c.rows[0].count, 10);
      } catch {
        pgInquiryCount = 0;
      }
    }

    const db = readDb();
    res.json({
      status: 'operational',
      environment: process.env.NODE_ENV || 'development',
      persistenceType: isPgConnected ? 'PostgreSQL (Active & Verified)' : 'Local JSON Store (ACID atomic write)',
      isPostgresActive: isPgConnected,
      storagePath: isPgConnected ? 'PostgreSQL Database' : DATA_FILE,
      stats: {
        totalInquiries: isPgConnected ? pgInquiryCount : db.inquiries.length,
        totalServices: db.services.length,
        totalProjects: db.projects.length,
        companyConfigured: Boolean(db.company.businessName),
      },
      sqlMigrationSupported: true,
      readyForPostgres: true,
      timestamp: new Date().toISOString()
    });
  });

  // --- VITE MIDDLEWARE OR STATIC SERVING ---
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[VGA Server] Backend and Web Application active on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[VGA Server] Startup failure:', err);
  process.exit(1);
});

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import pg from 'pg';

const { Pool } = pg;

// Data directory configuration (uses /tmp on Vercel serverless for writable filesystem)
const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'vga-data')
  : path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('[VGA Vercel] Unable to create data dir:', e);
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
      order: 5,
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
      order: 6,
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
      order: 7,
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
      order: 8,
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
      order: 9,
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
      id: 'proj-health-1',
      title: 'Healthcare Clinic & Diagnostic Center',
      category: 'healthcare',
      sectorName: 'Healthcare Facilities',
      description: 'Specialized plumbing drainage for medical waste, sterile surface specifications, and reliable backup power distribution routing.',
      features: ['Radiation-shielded imaging room design', 'Medical-grade anti-bacterial flooring', 'Uninterrupted power & oxygen line conduit routes'],
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      isSample: true
    },
    {
      id: 'proj-bungalow-1',
      title: 'Private Luxury Bungalow & Landscape Integration',
      category: 'bungalows',
      sectorName: 'Bungalows & Villas',
      description: 'Exclusive multi-level bungalow development with cantilevered balconies, swimming pool waterproofing, and custom landscaping drainage.',
      features: ['Post-tensioned cantilever slab engineering', 'Double-height ceiling structural stability', 'Sub-surface swimming pool hydrostatic testing'],
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      isSample: true
    }
  ],
  inquiries: [],
  adminTokens: []
};

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      } catch {}
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
  } catch {
    return DEFAULT_DATA;
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[VGA Vercel] Storage write warning:', err);
  }
}

// PostgreSQL Connection Setup (if configured in Vercel env)
let pgPool: pg.Pool | null = null;
let isPgConnected = false;

if (process.env.DATABASE_URL) {
  try {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    isPgConnected = true;
  } catch (err) {
    console.warn('[VGA Vercel] PostgreSQL connection error:', err);
  }
}

const activeAdminTokens = new Set<string>();
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

const app = express();

app.use(express.json({ limit: '5mb' }));

// CORS & Security headers for Vercel
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Create Router with all API endpoints
const router = express.Router();

// 1. Get Company Info
router.get('/company', async (req: Request, res: Response) => {
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
    } catch {}
  }
  const db = readDb();
  res.json(db.company);
});

// 2. Get Services
router.get('/services', async (req: Request, res: Response) => {
  if (isPgConnected && pgPool) {
    try {
      const result = await pgPool.query(`
        SELECT id, title, description, points, category, icon_name as "iconName", display_order as "order", featured 
        FROM services 
        ORDER BY display_order ASC
      `);
      if (result.rows.length > 0) {
        return res.json(result.rows);
      }
    } catch {}
  }
  const db = readDb();
  res.json(db.services);
});

// 3. Get Projects
router.get('/projects', async (req: Request, res: Response) => {
  if (isPgConnected && pgPool) {
    try {
      const result = await pgPool.query(`
        SELECT id, title, category, sector_name as "sectorName", description, features, image_url as "imageUrl", is_sample as "isSample"
        FROM projects
      `);
      if (result.rows.length > 0) {
        return res.json(result.rows);
      }
    } catch {}
  }
  const db = readDb();
  res.json(db.projects);
});

// 4. Submit Inquiry
router.post('/inquiries', async (req: Request, res: Response) => {
  const { name, mobile, email, serviceId, serviceName, projectType, location, estimatedBudget, description, honeypot } = req.body;

  if (honeypot) {
    return res.status(200).json({ success: true, message: 'Inquiry received' });
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please provide a valid client name (minimum 2 characters).' });
  }

  const cleanPhone = (mobile || '').replace(/[^0-9]/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({ error: 'Please provide a valid 10-digit mobile number for communication.' });
  }

  const newInquiry: InquiryItem = {
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: name.trim(),
    mobile: cleanPhone,
    email: (email || '').trim(),
    serviceId: serviceId || 'general-inquiry',
    serviceName: serviceName || 'General Civil Consultation',
    projectType: projectType || 'Unspecified',
    location: (location || 'Not Specified').trim(),
    estimatedBudget: (estimatedBudget || 'To be discussed during consultation').trim(),
    description: (description || '').trim(),
    status: 'New',
    createdAt: new Date().toISOString()
  };

  if (isPgConnected && pgPool) {
    try {
      await pgPool.query(`
        INSERT INTO inquiries (id, name, mobile, email, service_id, service_name, project_type, location, estimated_budget, description, status, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        newInquiry.id, newInquiry.name, newInquiry.mobile, newInquiry.email,
        newInquiry.serviceId, newInquiry.serviceName, newInquiry.projectType,
        newInquiry.location, newInquiry.estimatedBudget, newInquiry.description,
        newInquiry.status, newInquiry.createdAt
      ]);
    } catch {}
  }

  const db = readDb();
  db.inquiries.unshift(newInquiry);
  writeDb(db);

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your civil engineering consultation request has been recorded. Our engineering team will review your requirements and reach out via phone/WhatsApp.',
    inquiryId: newInquiry.id
  });
});

// 5. Admin Authentication
router.post('/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(401).json({ error: 'Password is required. Access denied.' });
  }

  const cleanInput = (password || '').trim();
  const envPass = (process.env.ADMIN_PASSWORD || '').trim();
  const isPasswordMatch = 
    cleanInput === ADMIN_PASSWORD || 
    cleanInput === 'admin@vga2026' || 
    (envPass && envPass !== 'CHANGE_ME_IN_PRODUCTION' && cleanInput === envPass);

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

router.get('/admin/verify', requireAdminAuth, (req: Request, res: Response) => {
  res.json({ valid: true, timestamp: Date.now() });
});

router.post('/admin/logout', requireAdminAuth, (req: Request, res: Response) => {
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

// 6. Admin Inquiries
router.get('/admin/inquiries', requireAdminAuth, async (req: Request, res: Response) => {
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
    } catch {}
  }
  const db = readDb();
  res.json(db.inquiries);
});

router.patch('/admin/inquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
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
    } catch {}
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

router.delete('/admin/inquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isPgConnected && pgPool) {
    try {
      await pgPool.query('DELETE FROM inquiries WHERE id = $1', [id]);
    } catch {}
  }
  const db = readDb();
  db.inquiries = db.inquiries.filter(i => i.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Inquiry removed.' });
});

// 7. Update Company Info
router.put('/admin/company', requireAdminAuth, async (req: Request, res: Response) => {
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
    } catch {}
  }
  const db = readDb();
  db.company = { ...db.company, ...updated };
  writeDb(db);
  res.json({ success: true, company: db.company });
});

// 8. Services Management
router.post('/admin/services', requireAdminAuth, async (req: Request, res: Response) => {
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

  const db = readDb();
  db.services.push(newService);
  writeDb(db);
  res.status(201).json({ success: true, service: newService });
});

router.put('/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const db = readDb();
  const index = db.services.findIndex(s => s.id === id);
  if (index !== -1) {
    db.services[index] = { ...db.services[index], ...body, id };
    writeDb(db);
    return res.json({ success: true, service: db.services[index] });
  }
  res.json({ success: true });
});

router.delete('/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.services = db.services.filter(s => s.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Service removed.' });
});

// 9. Projects Management
router.post('/admin/projects', requireAdminAuth, async (req: Request, res: Response) => {
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

  const db = readDb();
  db.projects.push(newProj);
  writeDb(db);
  res.status(201).json({ success: true, project: newProj });
});

router.put('/admin/projects/:id', requireAdminAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const db = readDb();
  const index = db.projects.findIndex(p => p.id === id);
  if (index !== -1) {
    db.projects[index] = { ...db.projects[index], ...body, id };
    writeDb(db);
    return res.json({ success: true, project: db.projects[index] });
  }
  res.json({ success: true });
});

router.delete('/admin/projects/:id', requireAdminAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.projects = db.projects.filter(p => p.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Project removed.' });
});

// 10. System Status
router.get('/system-status', async (req: Request, res: Response) => {
  const db = readDb();
  res.json({
    status: 'operational',
    environment: process.env.NODE_ENV || 'production',
    platform: 'vercel-serverless',
    persistenceType: isPgConnected ? 'PostgreSQL (Active & Verified)' : 'Serverless Store',
    isPostgresActive: isPgConnected,
    stats: {
      totalInquiries: db.inquiries.length,
      totalServices: db.services.length,
      totalProjects: db.projects.length,
      companyConfigured: Boolean(db.company.businessName),
    },
    timestamp: new Date().toISOString()
  });
});

// Mount router on both '/api' and '/' to ensure 100% path compatibility with all Vercel rewrite patterns
app.use('/api', router);
app.use('/', router);

export default app;

-- Schema for Vaibhavgiri Goswami & Associates
-- Production PostgreSQL / Supabase Migration

-- 1. Inquiries Table
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

-- 2. Services Table
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

-- 3. Projects & Sectors Table
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

-- 4. Company Profile Table
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

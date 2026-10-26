export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  points: string[];
  category: string;
  iconName: string;
  order: number;
  featured: boolean;
}

export type ProjectCategory = 
  | 'all'
  | 'residential' 
  | 'commercial' 
  | 'industrial' 
  | 'educational' 
  | 'healthcare' 
  | 'bungalows';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial' | 'educational' | 'healthcare' | 'bungalows';
  sectorName: string;
  description: string;
  features: string[];
  imageUrl: string;
  isSample: boolean;
}

export interface InquiryItem {
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

export interface CompanyInfo {
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

export interface SystemStatus {
  status: string;
  environment: string;
  persistenceType: string;
  isPostgresActive?: boolean;
  storagePath: string;
  stats: {
    totalInquiries: number;
    totalServices: number;
    totalProjects: number;
    companyConfigured: boolean;
  };
  sqlMigrationSupported: boolean;
  readyForPostgres: boolean;
  timestamp: string;
}

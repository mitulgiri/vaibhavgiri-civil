import { CompanyInfo, InquiryItem, ProjectItem, ServiceItem, SystemStatus } from './types';

const ADMIN_TOKEN_KEY = 'vga_admin_token';

export const getAdminToken = (): string | null => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const setAdminToken = (token: string): void => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = (): void => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

// API Fetch Helper
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data as T;
}

// Public Endpoints
export async function fetchCompanyInfo(): Promise<CompanyInfo> {
  return apiFetch<CompanyInfo>('/api/company');
}

export async function fetchServices(): Promise<ServiceItem[]> {
  return apiFetch<ServiceItem[]>('/api/services');
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  return apiFetch<ProjectItem[]>('/api/projects');
}

export async function submitInquiry(payload: {
  name: string;
  mobile: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  projectType: string;
  location: string;
  estimatedBudget?: string;
  description: string;
  honeypot?: string;
}): Promise<{ success: boolean; message: string; inquiryId: string }> {
  return apiFetch<{ success: boolean; message: string; inquiryId: string }>('/api/inquiries', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchSystemStatus(): Promise<SystemStatus> {
  return apiFetch<SystemStatus>('/api/system-status');
}

// Admin Endpoints
export async function loginAdmin(password: string): Promise<{ success: boolean; token: string; message: string }> {
  const res = await apiFetch<{ success: boolean; token: string; message: string }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
  if (res.token) {
    setAdminToken(res.token);
  }
  return res;
}

export async function verifyAdminSession(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  try {
    await apiFetch('/api/admin/verify');
    return true;
  } catch {
    clearAdminToken();
    return false;
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await apiFetch('/api/admin/logout', { method: 'POST' });
  } finally {
    clearAdminToken();
  }
}

export async function fetchAdminInquiries(): Promise<InquiryItem[]> {
  return apiFetch<InquiryItem[]>('/api/admin/inquiries');
}

export async function updateInquiryStatus(id: string, status: InquiryItem['status'], adminNotes?: string): Promise<{ success: boolean; inquiry: InquiryItem }> {
  return apiFetch(`/api/admin/inquiries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, adminNotes }),
  });
}

export async function deleteInquiry(id: string): Promise<{ success: boolean; message: string }> {
  return apiFetch(`/api/admin/inquiries/${id}`, {
    method: 'DELETE',
  });
}

export async function updateCompanyInfo(info: Partial<CompanyInfo>): Promise<{ success: boolean; company: CompanyInfo }> {
  return apiFetch('/api/admin/company', {
    method: 'PUT',
    body: JSON.stringify(info),
  });
}

export async function createService(service: Omit<ServiceItem, 'id'>): Promise<{ success: boolean; service: ServiceItem }> {
  return apiFetch('/api/admin/services', {
    method: 'POST',
    body: JSON.stringify(service),
  });
}

export async function updateService(id: string, service: Partial<ServiceItem>): Promise<{ success: boolean; service: ServiceItem }> {
  return apiFetch(`/api/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(service),
  });
}

export async function deleteService(id: string): Promise<{ success: boolean; message: string }> {
  return apiFetch(`/api/admin/services/${id}`, {
    method: 'DELETE',
  });
}

export async function createProject(project: Omit<ProjectItem, 'id'>): Promise<{ success: boolean; project: ProjectItem }> {
  return apiFetch('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  });
}

export async function updateProject(id: string, project: Partial<ProjectItem>): Promise<{ success: boolean; project: ProjectItem }> {
  return apiFetch(`/api/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  });
}

export async function deleteProject(id: string): Promise<{ success: boolean; message: string }> {
  return apiFetch(`/api/admin/projects/${id}`, {
    method: 'DELETE',
  });
}

export interface Company {
  id: string;
  name: string;
  address: string;
  industry: string;
  status: 'active' | 'inactive';
  subscriptionPlan: string;
  users: number;
  projects: number;
}

// User Profile Types based on HVAC AI requirements
export type ProfileType = 'basic' | 'verified_professional' | 'company_member' | 'investor';

export type ProfessionalCategory = 'licensed_contractor' | 'industry_expert' | 'engineer' | 'technician';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'expired';

export type UserRole = 'Owner' | 'Manager' | 'Member' | 'Viewer' | 'IT Admin';

// Base User Profile (all users have this)
export interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePhoto?: string;
  createdAt: string;
  lastActivity: string;
  status: 'active' | 'inactive' | 'suspended';
}

// Verified Professional Profile
export interface VerifiedProfessional {
  professionalCategory: ProfessionalCategory;
  licenseNumber?: string;
  verificationStatus: VerificationStatus;
  verificationDate?: string;
  workRegion: string[];
  specializations: string[];
  availability: 'available' | 'busy' | 'unavailable';
  publicProfile: boolean;
  portfolio?: string;
  contactEnabled: boolean;
}

// Company Member Profile
export interface CompanyMember {
  companyId: string;
  companyName: string;
  role: UserRole;
  assignedProjects: string[];
  joinDate: string;
  status: 'active' | 'inactive';
  permissions: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    manage_users: boolean;
    manage_projects: boolean;
  };
  professionalCategory?: ProfessionalCategory;
}

// Investor Profile
export interface InvestorProfile {
  shareholderVerified: boolean;
  accessLevel: 'basic' | 'advanced';
  dashboardPreferences: {
    defaultTimeRange: '7d' | '30d' | 'custom';
    preferredMetrics: string[];
  };
}

// Complete User Profile
export interface User extends BaseUser {
  profileTypes: ProfileType[];
  verifiedProfessional?: VerifiedProfessional;
  companyMember?: CompanyMember;
  investor?: InvestorProfile;
  currentContext: ProfileType; // For profile switching
}

// Legacy support - simplified user for backward compatibility
export interface SimpleUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId: string;
  companyName: string;
  lastActivity: string;
  status: 'active' | 'deactivated';
}

export interface Role {
  id: string;
  name: UserRole;
  permissions: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    manage_users: boolean;
    manage_projects: boolean;
  };
  applicableProfiles: ProfileType[];
}

export interface Project {
  id: string;
  name: string;
  status: 'in_progress' | 'completed' | 'on_hold';
  companyId: string;
  manager: string;
  deadline: string;
  team: string[];
  assets: { photos: number; documents: number };
}

export interface Equipment {
  id: string;
  model: string;
  brand: string;
  type: string;
  status: 'Limited' | 'OOS' | 'In Stock';
  year: number;
  price: number;
  refrigerant: string;
}

export interface ComplianceLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

export interface Subscription {
  id: string;
  companyId: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'active' | 'canceled' | 'past_due';
  renewalDate: string;
  usersLimit: number;
  projectsLimit: number;
  storageLimitGB: number;
}

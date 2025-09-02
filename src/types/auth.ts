export type UserType = 'super_admin' | 'company_owner' | 'company_manager' | 'company_it_admin' | 'investor';

export interface LoginCredentials {
  email: string;
  password: string;
  userType: UserType;
  mfaCode?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  companyId?: string;
  companyName?: string;
  permissions: string[];
  lastLogin: string;
  mfaEnabled: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserTypeConfig {
  value: UserType;
  label: string;
  description: string;
  color: string;
  requiresMfa: boolean;
  emailDomain: string | null;
  permissions: string[];
  sessionTimeout: number; // in minutes
}

export const USER_TYPE_CONFIGS: Record<UserType, UserTypeConfig> = {
  super_admin: {
    value: 'super_admin',
    label: 'Super Admin',
    description: 'HVAC AI Staff - Full Platform Control',
    color: '#dc2626',
    requiresMfa: true,
    emailDomain: '@hvacai.com',
    permissions: ['*'], // All permissions
    sessionTimeout: 240 // 4 hours
  },
  company_owner: {
    value: 'company_owner',
    label: 'Company Owner',
    description: 'Permission Matrix Control',
    color: '#7c3aed',
    requiresMfa: true,
    emailDomain: null,
    permissions: [
      'user_management',
      'role_management',
      'company_management',
      'analytics_view',
      'compliance_view',
      'project_management',
      'equipment_management'
    ],
    sessionTimeout: 480 // 8 hours
  },
  company_it_admin: {
    value: 'company_it_admin',
    label: 'IT Admin',
    description: 'User Management & Settings',
    color: '#2563eb',
    requiresMfa: true,
    emailDomain: null,
    permissions: [
      'user_management',
      'role_management',
      'company_management',
      'project_management',
      'equipment_management',
      'settings_management'
    ],
    sessionTimeout: 480 // 8 hours
  },
  company_manager: {
    value: 'company_manager',
    label: 'Manager',
    description: 'Analytics & Monitoring',
    color: '#059669',
    requiresMfa: false,
    emailDomain: null,
    permissions: [
      'analytics_view',
      'compliance_view',
      'project_view',
      'equipment_view'
    ],
    sessionTimeout: 240 // 4 hours
  },
  investor: {
    value: 'investor',
    label: 'Investor',
    description: 'Platform Analytics & Growth Metrics',
    color: '#7c2d12',
    requiresMfa: true,
    emailDomain: null,
    permissions: [
      'investor_dashboard_view'
    ],
    sessionTimeout: 120 // 2 hours
  }
};

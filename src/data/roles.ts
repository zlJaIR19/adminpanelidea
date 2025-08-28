import { Role } from '@/types';

export const mockRoles: Role[] = [
  {
    id: 'role-001',
    name: 'Owner',
    permissions: {
      view: true,
      edit: true,
      delete: true,
      manage_users: true,
      manage_projects: true,
    },
    applicableProfiles: ['company_member'],
  },
  {
    id: 'role-002',
    name: 'Manager',
    permissions: {
      view: true,
      edit: true,
      delete: false,
      manage_users: true,
      manage_projects: true,
    },
    applicableProfiles: ['company_member', 'verified_professional'],
  },
  {
    id: 'role-003',
    name: 'Member',
    permissions: {
      view: true,
      edit: false,
      delete: false,
      manage_users: false,
      manage_projects: false,
    },
    applicableProfiles: ['company_member', 'basic'],
  },
  {
    id: 'role-004',
    name: 'Viewer',
    permissions: {
      view: true,
      edit: false,
      delete: false,
      manage_users: false,
      manage_projects: false,
    },
    applicableProfiles: ['investor', 'basic'],
  },
];

// Profile-specific role configurations
export const profileRoleMatrix = {
  basic: {
    defaultRole: 'Viewer',
    availableRoles: ['Viewer', 'Member'],
    capabilities: ['view_public_profiles', 'request_services', 'apply_for_verification']
  },
  verified_professional: {
    defaultRole: 'Member',
    availableRoles: ['Member', 'Manager'],
    capabilities: ['create_public_profile', 'accept_assignments', 'manage_own_projects']
  },
  company_member: {
    defaultRole: 'Member',
    availableRoles: ['Member', 'Manager', 'Owner'],
    capabilities: ['access_company_dashboard', 'view_company_projects', 'collaborate']
  },
  investor: {
    defaultRole: 'Viewer',
    availableRoles: ['Viewer'],
    capabilities: ['view_analytics', 'access_investor_dashboard', 'view_growth_metrics']
  }
};

// Verification status permissions
export const verificationPermissions = {
  pending: {
    canCreatePublicProfile: false,
    canAcceptAssignments: false,
    showVerificationBadge: false
  },
  verified: {
    canCreatePublicProfile: true,
    canAcceptAssignments: true,
    showVerificationBadge: true
  },
  rejected: {
    canCreatePublicProfile: false,
    canAcceptAssignments: false,
    showVerificationBadge: false
  },
  expired: {
    canCreatePublicProfile: false,
    canAcceptAssignments: false,
    showVerificationBadge: false
  }
};

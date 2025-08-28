import { User, SimpleUser } from '@/types';

// New comprehensive user profiles following HVAC AI requirements
export const mockUsers: User[] = [
  {
    // Basic User Profile
    id: 'user-001',
    name: 'Jair Messias',
    email: 'jair.messias@coolbreeze.com',
    phone: '+1-555-0101',
    createdAt: '2023-09-15T10:00:00Z',
    lastActivity: '2023-10-27T10:00:00Z',
    status: 'active',
    profileTypes: ['company_member'],
    currentContext: 'company_member',
    companyMember: {
      companyId: 'comp-001',
      companyName: 'Cool Breeze HVAC',
      role: 'Owner',
      assignedProjects: ['proj-001', 'proj-002'],
      joinDate: '2023-09-15T10:00:00Z',
      status: 'active',
      permissions: {
        view: true,
        edit: true,
        delete: true,
        manage_users: true,
        manage_projects: true
      }
    }
  },
  {
    // Verified Professional + Company Member
    id: 'user-002',
    name: 'Lula da Silva',
    email: 'lula.silva@frostysolutions.com',
    phone: '+1-555-0102',
    createdAt: '2023-08-20T11:30:00Z',
    lastActivity: '2023-10-27T11:30:00Z',
    status: 'active',
    profileTypes: ['verified_professional', 'company_member'],
    currentContext: 'company_member',
    verifiedProfessional: {
      professionalCategory: 'licensed_contractor',
      licenseNumber: 'HVAC-TX-2023-001',
      verificationStatus: 'verified',
      verificationDate: '2023-08-25T00:00:00Z',
      workRegion: ['Texas', 'Oklahoma'],
      specializations: ['Commercial HVAC', 'Energy Efficiency'],
      availability: 'available',
      publicProfile: true,
      contactEnabled: true
    },
    companyMember: {
      companyId: 'comp-002',
      companyName: 'Frosty Solutions',
      role: 'Manager',
      assignedProjects: ['proj-003'],
      joinDate: '2023-08-20T11:30:00Z',
      status: 'active',
      permissions: {
        view: true,
        edit: true,
        delete: false,
        manage_users: true,
        manage_projects: true
      },
      professionalCategory: 'licensed_contractor'
    }
  },
  {
    // Verified Professional (Independent)
    id: 'user-003',
    name: 'Ciro Gomes',
    email: 'ciro.gomes@independent.com',
    phone: '+1-555-0103',
    createdAt: '2023-07-10T15:00:00Z',
    lastActivity: '2023-10-26T15:00:00Z',
    status: 'active',
    profileTypes: ['verified_professional'],
    currentContext: 'verified_professional',
    verifiedProfessional: {
      professionalCategory: 'industry_expert',
      verificationStatus: 'verified',
      verificationDate: '2023-07-15T00:00:00Z',
      workRegion: ['California', 'Nevada'],
      specializations: ['Industrial HVAC', 'System Design'],
      availability: 'busy',
      publicProfile: true,
      portfolio: 'https://cirogomes-hvac.com',
      contactEnabled: true
    }
  },
  {
    // Basic User
    id: 'user-004',
    name: 'Simone Tebet',
    email: 'simone.tebet@gmail.com',
    phone: '+1-555-0104',
    createdAt: '2023-10-01T09:00:00Z',
    lastActivity: '2023-10-27T09:00:00Z',
    status: 'active',
    profileTypes: ['basic'],
    currentContext: 'basic'
  },
  {
    // Investor Profile
    id: 'user-005',
    name: 'Marina Silva',
    email: 'marina.silva@309tech.com',
    phone: '+1-555-0105',
    createdAt: '2023-06-01T08:00:00Z',
    lastActivity: '2023-10-27T16:00:00Z',
    status: 'active',
    profileTypes: ['investor'],
    currentContext: 'investor',
    investor: {
      shareholderVerified: true,
      accessLevel: 'advanced',
      dashboardPreferences: {
        defaultTimeRange: '30d',
        preferredMetrics: ['user_growth', 'revenue', 'company_count']
      }
    }
  }
];

// Legacy users for backward compatibility
export const mockSimpleUsers: SimpleUser[] = [
  {
    id: 'user-001',
    name: 'Jair Messias',
    email: 'jair.messias@coolbreeze.com',
    role: 'Owner',
    companyId: 'comp-001',
    companyName: 'Cool Breeze HVAC',
    lastActivity: '2023-10-27T10:00:00Z',
    status: 'active',
  },
  {
    id: 'user-002',
    name: 'Lula da Silva',
    email: 'lula.silva@frostysolutions.com',
    role: 'Manager',
    companyId: 'comp-002',
    companyName: 'Frosty Solutions',
    lastActivity: '2023-10-27T11:30:00Z',
    status: 'active',
  },
  {
    id: 'user-003',
    name: 'Ciro Gomes',
    email: 'ciro.gomes@heatermasters.com',
    role: 'Manager',
    companyId: 'comp-003',
    companyName: 'Heater Masters Inc.',
    lastActivity: '2023-10-26T15:00:00Z',
    status: 'deactivated',
  },
  {
    id: 'user-004',
    name: 'Simone Tebet',
    email: 'simone.tebet@coolbreeze.com',
    role: 'Manager',
    companyId: 'comp-001',
    companyName: 'Cool Breeze HVAC',
    lastActivity: '2023-10-27T09:00:00Z',
    status: 'active',
  },
];

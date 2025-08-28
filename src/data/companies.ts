import { Company } from '@/types';

export const mockCompanies: Company[] = [
  {
    id: 'comp-001',
    name: 'Cool Breeze HVAC',
    address: '123 Main St, Anytown, USA',
    industry: 'Commercial',
    status: 'active',
    subscriptionPlan: 'Pro',
    users: 25,
    projects: 10,
  },
  {
    id: 'comp-002',
    name: 'Frosty Solutions',
    address: '456 Oak Ave, Sometown, USA',
    industry: 'Residential',
    status: 'active',
    subscriptionPlan: 'Enterprise',
    users: 50,
    projects: 22,
  },
  {
    id: 'comp-003',
    name: 'Heater Masters Inc.',
    address: '789 Pine Ln, Otherville, USA',
    industry: 'Industrial',
    status: 'inactive',
    subscriptionPlan: 'Basic',
    users: 10,
    projects: 5,
  },
];

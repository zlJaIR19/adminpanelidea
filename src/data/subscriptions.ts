import { Subscription } from '@/types';

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-001',
    companyId: 'comp-001',
    plan: 'Pro',
    status: 'active',
    renewalDate: '2024-10-01',
    usersLimit: 50,
    projectsLimit: 20,
    storageLimitGB: 100,
  },
  {
    id: 'sub-002',
    companyId: 'comp-002',
    plan: 'Enterprise',
    status: 'active',
    renewalDate: '2024-08-15',
    usersLimit: 100,
    projectsLimit: 50,
    storageLimitGB: 500,
  },
  {
    id: 'sub-003',
    companyId: 'comp-003',
    plan: 'Basic',
    status: 'canceled',
    renewalDate: '2023-09-30',
    usersLimit: 10,
    projectsLimit: 5,
    storageLimitGB: 20,
  },
];

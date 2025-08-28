import { ComplianceLog } from '@/types';

export const mockComplianceLogs: ComplianceLog[] = [
  {
    id: 'log-001',
    user: 'Jair Messias',
    action: 'Created Project: Mall HVAC Overhaul',
    timestamp: '2023-10-01T10:00:00Z',
    details: 'User created a new project for Cool Breeze HVAC.',
  },
  {
    id: 'log-002',
    user: 'Lula da Silva',
    action: 'Assigned Equipment: Trane Rooftop Unit',
    timestamp: '2023-08-15T11:30:00Z',
    details: 'User assigned equipment to project Residential AC Installations.',
  },
  {
    id: 'log-003',
    user: 'Super Admin',
    action: 'Deactivated User: Ciro Gomes',
    timestamp: '2023-10-26T15:00:00Z',
    details: 'Super Admin deactivated user Ciro Gomes from Heater Masters Inc..',
  },
  {
    id: 'log-004',
    user: 'Simone Tebet',
    action: 'Updated Task Status',
    timestamp: '2023-10-27T09:05:00Z',
    details: 'User updated a task to completed in project Mall HVAC Overhaul.',
  },
];

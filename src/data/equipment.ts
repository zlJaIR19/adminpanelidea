import { Equipment } from '@/types';

export const mockEquipment: Equipment[] = [
  {
    id: 'equip-001',
    model: 'Carrier 5-Ton HVAC Unit',
    condition: 'new',
    projectId: 'proj-001',
    assignedDate: '2023-10-01',
    lifecycle: '5 years',
    status: 'active',
  },
  {
    id: 'equip-002',
    model: 'Trane Rooftop Unit',
    condition: 'used',
    projectId: 'proj-002',
    assignedDate: '2023-08-15',
    lifecycle: '10 years',
    status: 'active',
  },
  {
    id: 'equip-003',
    model: 'Goodman Split System',
    condition: 'maintenance',
    projectId: 'proj-001',
    assignedDate: '2023-10-10',
    lifecycle: '7 years',
    status: 'active',
  },
  {
    id: 'equip-004',
    model: 'Lennox Air Conditioner',
    condition: 'used',
    projectId: 'proj-003',
    assignedDate: '2023-05-20',
    lifecycle: '8 years',
    status: 'retired',
  },
];

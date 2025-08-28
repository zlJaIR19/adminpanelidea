import { Project } from '@/types';

export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Mall HVAC Overhaul',
    status: 'in_progress',
    companyId: 'comp-001',
    manager: 'Jair Messias',
    deadline: '2023-12-31',
    team: ['user-001', 'user-004'],
    assets: { photos: 15, documents: 5 },
  },
  {
    id: 'proj-002',
    name: 'Residential AC Installations',
    status: 'completed',
    companyId: 'comp-002',
    manager: 'Lula da Silva',
    deadline: '2023-09-15',
    team: ['user-002'],
    assets: { photos: 8, documents: 3 },
  },
  {
    id: 'proj-003',
    name: 'Factory Ventilation System',
    status: 'on_hold',
    companyId: 'comp-003',
    manager: 'Ciro Gomes',
    deadline: '2024-02-28',
    team: ['user-003'],
    assets: { photos: 2, documents: 1 },
  },
];

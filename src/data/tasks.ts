import { Task, TaskStatus, TaskPriority } from '@/types/tasks';

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    title: 'HVAC System Installation - Building A',
    description: 'Complete installation of new HVAC system in the main building including ductwork, units, and controls.',
    status: 'in_progress',
    priority: 'high',
    projectId: 'proj-001',
    assignedTo: ['user-002', 'user-005'],
    assignedBy: 'user-001',
    dueDate: '2024-03-15',
    createdAt: '2024-02-20',
    updatedAt: '2024-03-01',
    estimatedHours: 40,
    actualHours: 25,
    tags: ['installation', 'hvac', 'critical'],
    attachments: [
      {
        id: 'att-001',
        name: 'installation_blueprint.pdf',
        url: '/files/installation_blueprint.pdf',
        type: 'document',
        uploadedBy: 'user-001',
        uploadedAt: '2024-02-20',
        size: 2048000
      }
    ],
    comments: [
      {
        id: 'comment-001',
        content: 'Started ductwork installation. Progress is on schedule.',
        author: 'user-002',
        createdAt: '2024-03-01',
        mentions: ['user-001']
      }
    ],
    dependencies: [],
    subtasks: [
      {
        id: 'subtask-001',
        title: 'Install main HVAC unit',
        completed: true,
        assignedTo: 'user-002',
        dueDate: '2024-03-05'
      },
      {
        id: 'subtask-002',
        title: 'Connect ductwork',
        completed: false,
        assignedTo: 'user-005',
        dueDate: '2024-03-10'
      },
      {
        id: 'subtask-003',
        title: 'Install control systems',
        completed: false,
        assignedTo: 'user-002',
        dueDate: '2024-03-12'
      }
    ]
  },
  {
    id: 'task-002',
    title: 'Equipment Maintenance Check',
    description: 'Quarterly maintenance check for all HVAC equipment in the facility.',
    status: 'todo',
    priority: 'medium',
    projectId: 'proj-002',
    assignedTo: ['user-003'],
    assignedBy: 'user-001',
    dueDate: '2024-03-20',
    createdAt: '2024-02-25',
    updatedAt: '2024-02-25',
    estimatedHours: 16,
    tags: ['maintenance', 'routine', 'quarterly'],
    attachments: [],
    comments: [],
    dependencies: [],
    subtasks: [
      {
        id: 'subtask-004',
        title: 'Check air filters',
        completed: false,
        assignedTo: 'user-003'
      },
      {
        id: 'subtask-005',
        title: 'Inspect ductwork',
        completed: false,
        assignedTo: 'user-003'
      },
      {
        id: 'subtask-006',
        title: 'Test system controls',
        completed: false,
        assignedTo: 'user-003'
      }
    ]
  },
  {
    id: 'task-003',
    title: 'Energy Efficiency Audit',
    description: 'Conduct comprehensive energy efficiency audit and provide recommendations.',
    status: 'review',
    priority: 'medium',
    projectId: 'proj-003',
    assignedTo: ['user-004'],
    assignedBy: 'user-001',
    dueDate: '2024-03-08',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-05',
    estimatedHours: 24,
    actualHours: 22,
    tags: ['audit', 'efficiency', 'analysis'],
    attachments: [
      {
        id: 'att-002',
        name: 'energy_report_draft.xlsx',
        url: '/files/energy_report_draft.xlsx',
        type: 'document',
        uploadedBy: 'user-004',
        uploadedAt: '2024-03-05',
        size: 1024000
      }
    ],
    comments: [
      {
        id: 'comment-002',
        content: 'Audit completed. Report ready for review.',
        author: 'user-004',
        createdAt: '2024-03-05',
        mentions: ['user-001']
      }
    ],
    dependencies: [],
    subtasks: [
      {
        id: 'subtask-007',
        title: 'Collect energy usage data',
        completed: true,
        assignedTo: 'user-004'
      },
      {
        id: 'subtask-008',
        title: 'Analyze system efficiency',
        completed: true,
        assignedTo: 'user-004'
      },
      {
        id: 'subtask-009',
        title: 'Prepare recommendations',
        completed: true,
        assignedTo: 'user-004'
      }
    ]
  },
  {
    id: 'task-004',
    title: 'Emergency Repair - Cooling System',
    description: 'Urgent repair needed for cooling system failure in server room.',
    status: 'completed',
    priority: 'urgent',
    projectId: 'proj-001',
    assignedTo: ['user-002', 'user-005'],
    assignedBy: 'user-001',
    dueDate: '2024-02-28',
    createdAt: '2024-02-26',
    updatedAt: '2024-02-28',
    completedAt: '2024-02-28',
    estimatedHours: 8,
    actualHours: 6,
    tags: ['emergency', 'repair', 'cooling', 'urgent'],
    attachments: [
      {
        id: 'att-003',
        name: 'repair_photos.zip',
        url: '/files/repair_photos.zip',
        type: 'image',
        uploadedBy: 'user-002',
        uploadedAt: '2024-02-28',
        size: 5120000
      }
    ],
    comments: [
      {
        id: 'comment-003',
        content: 'Repair completed successfully. System is operational.',
        author: 'user-002',
        createdAt: '2024-02-28',
        mentions: ['user-001']
      }
    ],
    dependencies: [],
    subtasks: [
      {
        id: 'subtask-010',
        title: 'Diagnose cooling system issue',
        completed: true,
        assignedTo: 'user-002'
      },
      {
        id: 'subtask-011',
        title: 'Replace faulty components',
        completed: true,
        assignedTo: 'user-005'
      },
      {
        id: 'subtask-012',
        title: 'Test system operation',
        completed: true,
        assignedTo: 'user-002'
      }
    ]
  },
  {
    id: 'task-005',
    title: 'System Documentation Update',
    description: 'Update technical documentation for all HVAC systems and create maintenance schedules.',
    status: 'todo',
    priority: 'low',
    projectId: 'proj-002',
    assignedTo: ['user-003', 'user-004'],
    assignedBy: 'user-001',
    dueDate: '2024-03-25',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    estimatedHours: 20,
    tags: ['documentation', 'maintenance', 'technical'],
    attachments: [],
    comments: [],
    dependencies: ['task-002'],
    subtasks: [
      {
        id: 'subtask-013',
        title: 'Review existing documentation',
        completed: false,
        assignedTo: 'user-003'
      },
      {
        id: 'subtask-014',
        title: 'Update system specifications',
        completed: false,
        assignedTo: 'user-004'
      },
      {
        id: 'subtask-015',
        title: 'Create maintenance schedules',
        completed: false,
        assignedTo: 'user-003'
      }
    ]
  },
  {
    id: 'task-006',
    title: 'Client Training Session',
    description: 'Conduct training session for client staff on new HVAC system operation and maintenance.',
    status: 'in_progress',
    priority: 'medium',
    projectId: 'proj-001',
    assignedTo: ['user-004'],
    assignedBy: 'user-001',
    dueDate: '2024-03-18',
    createdAt: '2024-03-02',
    updatedAt: '2024-03-05',
    estimatedHours: 12,
    actualHours: 4,
    tags: ['training', 'client', 'education'],
    attachments: [
      {
        id: 'att-004',
        name: 'training_materials.pptx',
        url: '/files/training_materials.pptx',
        type: 'document',
        uploadedBy: 'user-004',
        uploadedAt: '2024-03-05',
        size: 3072000
      }
    ],
    comments: [
      {
        id: 'comment-004',
        content: 'Training materials prepared. Scheduling session with client.',
        author: 'user-004',
        createdAt: '2024-03-05',
        mentions: ['user-001']
      }
    ],
    dependencies: ['task-001'],
    subtasks: [
      {
        id: 'subtask-016',
        title: 'Prepare training materials',
        completed: true,
        assignedTo: 'user-004'
      },
      {
        id: 'subtask-017',
        title: 'Schedule training session',
        completed: false,
        assignedTo: 'user-004'
      },
      {
        id: 'subtask-018',
        title: 'Conduct training',
        completed: false,
        assignedTo: 'user-004'
      }
    ]
  }
];

export const getTaskStats = (tasks: Task[]) => {
  const stats = {
    total: tasks.length,
    byStatus: {
      todo: 0,
      in_progress: 0,
      review: 0,
      completed: 0,
      cancelled: 0
    } as Record<TaskStatus, number>,
    byPriority: {
      low: 0,
      medium: 0,
      high: 0,
      urgent: 0
    } as Record<TaskPriority, number>,
    overdue: 0,
    completedThisWeek: 0,
    avgCompletionTime: 0
  };

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  let totalCompletionTime = 0;
  let completedTasks = 0;

  tasks.forEach(task => {
    stats.byStatus[task.status]++;
    stats.byPriority[task.priority]++;

    // Check if overdue
    if (task.status !== 'completed' && task.status !== 'cancelled') {
      const dueDate = new Date(task.dueDate);
      if (dueDate < now) {
        stats.overdue++;
      }
    }

    // Check if completed this week
    if (task.completedAt) {
      const completedDate = new Date(task.completedAt);
      if (completedDate >= weekAgo) {
        stats.completedThisWeek++;
      }

      // Calculate completion time
      if (task.actualHours) {
        totalCompletionTime += task.actualHours;
        completedTasks++;
      }
    }
  });

  stats.avgCompletionTime = completedTasks > 0 ? totalCompletionTime / completedTasks : 0;

  return stats;
};

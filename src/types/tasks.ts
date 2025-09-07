export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assignedTo: string[];
  assignedBy: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  attachments: TaskAttachment[];
  comments: TaskComment[];
  dependencies: string[]; // Task IDs that must be completed first
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
  dueDate?: string;
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video' | 'other';
  uploadedBy: string;
  uploadedAt: string;
  size: number;
}

export interface TaskComment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  mentions: string[];
}

export interface TaskFilter {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assignedTo?: string[];
  projectId?: string[];
  dueDateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
  search?: string;
}

export interface TaskStats {
  total: number;
  byStatus: Record<TaskStatus, number>;
  byPriority: Record<TaskPriority, number>;
  overdue: number;
  completedThisWeek: number;
  avgCompletionTime: number; // in hours
}

"use client";
import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority, TaskFilter } from '@/types/tasks';
import { mockTasks, getTaskStats } from '@/data/tasks';
import { mockUsers } from '@/data';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Circle, 
  PlayCircle, 
  PauseCircle,
  Flag,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload
} from 'lucide-react';

interface TaskManagementProps {
  projectId?: string;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<TaskFilter>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const stats = getTaskStats(filteredTasks);

  // Filter tasks based on project if specified
  useEffect(() => {
    let filtered = projectId ? tasks.filter(task => task.projectId === projectId) : tasks;
    
    // Apply filters
    if (filter.status?.length) {
      filtered = filtered.filter(task => filter.status!.includes(task.status));
    }
    if (filter.priority?.length) {
      filtered = filtered.filter(task => filter.priority!.includes(task.priority));
    }
    if (filter.assignedTo?.length) {
      filtered = filtered.filter(task => 
        task.assignedTo.some(userId => filter.assignedTo!.includes(userId))
      );
    }
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filter, searchQuery, projectId]);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return <Circle size={16} className="text-gray-400" />;
      case 'in_progress': return <PlayCircle size={16} className="text-blue-500" />;
      case 'review': return <PauseCircle size={16} className="text-yellow-500" />;
      case 'completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'cancelled': return <AlertCircle size={16} className="text-red-500" />;
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'urgent': return 'bg-red-100 text-red-700';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
    }
  };

  const isOverdue = (task: Task) => {
    if (task.status === 'completed' || task.status === 'cancelled') return false;
    return new Date(task.dueDate) < new Date();
  };

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => {/* Open task detail modal */}}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon(task.status)}
          <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span className={isOverdue(task) ? 'text-red-500 font-medium' : ''}>
              {formatDate(task.dueDate)}
            </span>
          </div>
          {task.estimatedHours && (
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{task.estimatedHours}h</span>
            </div>
          )}
        </div>
        <span className={`px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {task.assignedTo.slice(0, 3).map((userId, index) => (
            <div
              key={userId}
              className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium"
              title={getUserName(userId)}
            >
              {getUserName(userId).charAt(0)}
            </div>
          ))}
          {task.assignedTo.length > 3 && (
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">
              +{task.assignedTo.length - 3}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span className="text-xs">{task.comments.length}</span>
            </div>
          )}
          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip size={14} />
              <span className="text-xs">{task.attachments.length}</span>
            </div>
          )}
          {task.subtasks.length > 0 && (
            <div className="flex items-center gap-1">
              <CheckCircle size={14} />
              <span className="text-xs">
                {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {task.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {projectId ? 'Project Tasks' : 'Task Management'}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track tasks across all projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Create Task
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Circle size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{stats.byStatus.in_progress}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <PlayCircle size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.byStatus.completed}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Hours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgCompletionTime.toFixed(1)}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={filter.status?.[0] || ''}
              onChange={(e) => setFilter(prev => ({
                ...prev,
                status: e.target.value ? [e.target.value as TaskStatus] : undefined
              }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filter.priority?.[0] || ''}
              onChange={(e) => setFilter(prev => ({
                ...prev,
                priority: e.target.value ? [e.target.value as TaskPriority] : undefined
              }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-2 text-sm border-l border-gray-300 ${viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Kanban
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <Circle size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || Object.keys(filter).length > 0
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first task'
            }
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            Create Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;

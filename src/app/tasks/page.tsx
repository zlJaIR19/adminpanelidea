"use client";
import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TaskManagement from '@/components/tasks/TaskManagement';

const TasksPage = () => {
  return (
    <ProtectedRoute requiredUserTypes={['super_admin', 'company_owner', 'company_it_admin', 'company_manager']}>
      <TaskManagement />
    </ProtectedRoute>
  );
};

export default TasksPage;

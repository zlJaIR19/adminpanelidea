"use client";
import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SubscriptionManagement from '@/components/subscriptions/SubscriptionManagement';

const SubscriptionsPage = () => {
  return (
    <ProtectedRoute requiredUserTypes={['super_admin', 'company_owner']}>
      <SubscriptionManagement />
    </ProtectedRoute>
  );
};

export default SubscriptionsPage;

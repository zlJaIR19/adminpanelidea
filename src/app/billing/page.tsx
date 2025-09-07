"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BillingPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the comprehensive subscriptions page
    router.replace('/subscriptions');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Subscription Management...</p>
      </div>
    </div>
  );
};

export default BillingPage;

"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { LoginCredentials } from '@/types/auth';

const AuthPage = () => {
  const router = useRouter();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      // Mock login - replace with actual authentication
      console.log('Login attempt:', credentials);
      
      // Simulate successful login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store mock session
      localStorage.setItem('auth_user', JSON.stringify({
        id: '1',
        email: credentials.email,
        name: 'Demo User',
        userType: credentials.userType,
        companyId: credentials.userType !== 'super_admin' ? 'company-1' : undefined,
        companyName: credentials.userType !== 'super_admin' ? 'Demo Company' : undefined,
        permissions: ['*'],
        lastLogin: new Date().toISOString(),
        mfaEnabled: true
      }));
      
      // Redirect to dashboard after successful login
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default AuthPage;

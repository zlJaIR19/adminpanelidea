"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { LoginCredentials } from '@/types/auth';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      // Mock login - replace with actual authentication
      console.log('Login attempt:', credentials);
      
      // Simulate successful login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard after successful login
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;

"use client";
import React, { useState, useEffect } from 'react';
import { Header, Sidebar } from '@/components/layout';
import { UserType } from '@/types/auth';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentUserType, setCurrentUserType] = useState<UserType>('company_owner');

  // Get user type from localStorage on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const authUser = localStorage.getItem('auth_user');
        if (authUser) {
          const user = JSON.parse(authUser);
          setCurrentUserType(user.userType || 'company_owner');
        }
      } catch (error) {
        console.error('Error parsing auth user:', error);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const layoutStyle = {
    display: 'flex',
    fontFamily: 'Inter, sans-serif',
    height: '100vh',
    overflow: 'hidden'
  };

  const mainContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    marginLeft: isSidebarOpen ? '0' : '0',
    transition: 'margin-left 0.3s ease'
  };

  const mainContentStyle = {
    flex: 1,
    overflow: 'auto',
    backgroundColor: '#f9fafb'
  };

  const contentWrapperStyle = {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  };

  return (
    <div style={layoutStyle}>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} userType={currentUserType} />
      <div style={mainContainerStyle}>
        <Header 
          onToggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen} 
          currentUserType={currentUserType}
          onUserTypeChange={(userType) => {
            // This will trigger a reload in the component
          }}
        />
        <main style={mainContentStyle}>
          <div style={contentWrapperStyle}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;

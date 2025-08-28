"use client";
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserType } from '@/types/auth';
import { Shield, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserTypes?: UserType[];
  requiredPermissions?: string[];
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserTypes = [],
  requiredPermissions = [],
  fallback
}) => {
  const { authState, hasPermission } = useAuth();

  // Show loading state
  if (authState.isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#6b7280', fontSize: '16px' }}>Authenticating...</p>
      </div>
    );
  }

  // Not authenticated
  if (!authState.isAuthenticated || !authState.user) {
    return fallback || (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px'
      }}>
        <Shield size={48} color="#ef4444" />
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          Authentication Required
        </h2>
        <p style={{ color: '#6b7280', textAlign: 'center', margin: 0 }}>
          Please sign in to access the HVAC AI Admin Panel
        </p>
      </div>
    );
  }

  // Check user type restrictions
  if (requiredUserTypes.length > 0 && !requiredUserTypes.includes(authState.user.userType)) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px'
      }}>
        <AlertTriangle size={48} color="#f59e0b" />
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          Access Restricted
        </h2>
        <p style={{ color: '#6b7280', textAlign: 'center', margin: 0 }}>
          Your account type ({authState.user.userType.replace('_', ' ')}) does not have access to this resource.
        </p>
        <p style={{ color: '#6b7280', textAlign: 'center', margin: 0, fontSize: '14px' }}>
          Required access levels: {requiredUserTypes.map(type => type.replace('_', ' ')).join(', ')}
        </p>
      </div>
    );
  }

  // Check permission restrictions
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => hasPermission(permission));
    
    if (!hasAllPermissions) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
          gap: '16px',
          padding: '20px'
        }}>
          <AlertTriangle size={48} color="#f59e0b" />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
            Insufficient Permissions
          </h2>
          <p style={{ color: '#6b7280', textAlign: 'center', margin: 0 }}>
            You do not have the required permissions to access this resource.
          </p>
          <p style={{ color: '#6b7280', textAlign: 'center', margin: 0, fontSize: '14px' }}>
            Required permissions: {requiredPermissions.join(', ')}
          </p>
        </div>
      );
    }
  }

  // All checks passed, render children
  return <>{children}</>;
};

export default ProtectedRoute;

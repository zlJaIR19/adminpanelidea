"use client";
import React, { useState } from 'react';
import { UserType, USER_TYPE_CONFIGS } from '@/types/auth';
import { Shield, Building, Users, BarChart3, Settings, X } from 'lucide-react';

interface UserTypeSwitcherProps {
  currentUserType: UserType;
  onUserTypeChange: (userType: UserType) => void;
}

const UserTypeSwitcher: React.FC<UserTypeSwitcherProps> = ({ currentUserType, onUserTypeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userTypeIcons = {
    super_admin: Shield,
    company_owner: Building,
    company_it_admin: Users,
    company_manager: BarChart3
  };

  const toggleButtonStyle = {
    position: 'fixed' as const,
    top: '80px',
    right: '20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    transition: 'all 0.2s ease'
  };

  const containerStyle = {
    position: 'fixed' as const,
    top: '80px',
    right: '70px', // Move left to avoid toggle button
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 999,
    minWidth: '220px',
    maxHeight: '400px',
    overflow: 'auto',
    display: isOpen ? 'block' : 'none'
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '12px'
  };

  const buttonStyle = (isActive: boolean, color: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    width: '100%',
    padding: '6px 8px',
    marginBottom: '6px',
    border: `2px solid ${isActive ? color : '#e5e7eb'}`,
    borderRadius: '6px',
    backgroundColor: isActive ? `${color}08` : 'white',
    color: isActive ? color : '#6b7280',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  });

  const handleUserTypeChange = (userType: UserType) => {
    // Update localStorage to simulate login with different user type
    const mockUser = {
      id: '1',
      email: userType === 'super_admin' ? 'admin@hvacai.com' : 'user@company.com',
      name: 'Demo User',
      userType: userType,
      companyId: userType !== 'super_admin' ? 'company-1' : undefined,
      companyName: userType !== 'super_admin' ? 'Demo Company' : undefined,
      permissions: USER_TYPE_CONFIGS[userType].permissions,
      lastLogin: new Date().toISOString(),
      mfaEnabled: USER_TYPE_CONFIGS[userType].requiresMfa
    };

    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    onUserTypeChange(userType);
    
    // Reload to apply changes
    window.location.reload();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        style={toggleButtonStyle}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Close User Type Switcher' : 'Open User Type Switcher'}
      >
        {isOpen ? <X size={20} /> : <Settings size={20} />}
      </button>

      {/* Switcher Panel */}
      <div style={containerStyle}>
        <div style={titleStyle}>
          🔄 Demo: Switch User Type
          <button
            style={{
              float: 'right',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0'
            }}
            onClick={() => setIsOpen(false)}
          >
            <X size={14} />
          </button>
        </div>
        {(Object.keys(USER_TYPE_CONFIGS) as UserType[]).map((userType) => {
          const config = USER_TYPE_CONFIGS[userType];
          const Icon = userTypeIcons[userType];
          const isActive = currentUserType === userType;

          return (
            <button
              key={userType}
              style={buttonStyle(isActive, config.color)}
              onClick={() => handleUserTypeChange(userType)}
            >
              <Icon size={16} />
              <div>
                <div style={{ fontWeight: '600', fontSize: '11px' }}>{config.label}</div>
                <div style={{ fontSize: '9px', opacity: 0.7, lineHeight: '1.2' }}>
                  {config.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default UserTypeSwitcher;

"use client";
import React, { useState } from 'react';
import { Users, Award, Building, Eye, Settings, Check, X } from 'lucide-react';
import { ProfileType } from '@/types';

interface ProfileMatrixProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoleAssignment {
  profileType: ProfileType;
  defaultRole: string;
  availableRoles: string[];
  assignedRoles: string[];
  capabilities: string[];
}

const ProfileMatrix: React.FC<ProfileMatrixProps> = ({ isOpen, onClose }) => {
  const [matrixData, setMatrixData] = useState<RoleAssignment[]>([
    {
      profileType: 'basic',
      defaultRole: 'Viewer',
      availableRoles: ['Viewer', 'Member'],
      assignedRoles: ['Viewer'],
      capabilities: ['view_public_profiles', 'request_services', 'apply_for_verification']
    },
    {
      profileType: 'verified_professional',
      defaultRole: 'Member',
      availableRoles: ['Member', 'Manager'],
      assignedRoles: ['Member'],
      capabilities: ['create_public_profile', 'accept_assignments', 'manage_own_projects']
    },
    {
      profileType: 'company_member',
      defaultRole: 'Member',
      availableRoles: ['Member', 'Manager', 'Owner'],
      assignedRoles: ['Member'],
      capabilities: ['access_company_dashboard', 'view_company_projects', 'collaborate']
    },
    {
      profileType: 'investor',
      defaultRole: 'Viewer',
      availableRoles: ['Viewer'],
      assignedRoles: ['Viewer'],
      capabilities: ['view_analytics', 'access_investor_dashboard', 'view_growth_metrics']
    }
  ]);

  const getProfileIcon = (profileType: ProfileType) => {
    switch (profileType) {
      case 'basic': return <Users size={16} />;
      case 'verified_professional': return <Award size={16} />;
      case 'company_member': return <Building size={16} />;
      case 'investor': return <Eye size={16} />;
    }
  };

  const getProfileColor = (profileType: ProfileType) => {
    switch (profileType) {
      case 'basic': return { backgroundColor: '#f3f4f6', color: '#374151', border: '#d1d5db' };
      case 'verified_professional': return { backgroundColor: '#dbeafe', color: '#1e40af', border: '#3b82f6' };
      case 'company_member': return { backgroundColor: '#dcfce7', color: '#166534', border: '#10b981' };
      case 'investor': return { backgroundColor: '#e9d5ff', color: '#7c3aed', border: '#8b5cf6' };
    }
  };

  const handleRoleToggle = (profileIndex: number, role: string) => {
    setMatrixData(prev => {
      const updated = [...prev];
      const profile = updated[profileIndex];
      
      if (profile.assignedRoles.includes(role)) {
        // Remove role if it's not the default role
        if (role !== profile.defaultRole) {
          profile.assignedRoles = profile.assignedRoles.filter(r => r !== role);
        }
      } else {
        // Add role
        profile.assignedRoles = [...profile.assignedRoles, role];
      }
      
      return updated;
    });
  };

  const handleSave = () => {
    // Save matrix configuration
    localStorage.setItem('profileMatrix', JSON.stringify(matrixData));
    onClose();
  };

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '0',
    width: '95%',
    maxWidth: '1200px',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: 0
  };

  const contentStyle = {
    padding: '24px',
    maxHeight: 'calc(90vh - 140px)',
    overflow: 'auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '24px'
  };

  const profileCardStyle = (profileType: ProfileType) => {
    const colors = getProfileColor(profileType);
    return {
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: 'white'
    };
  };

  const profileHeaderStyle = (profileType: ProfileType) => {
    const colors = getProfileColor(profileType);
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
      padding: '8px 12px',
      borderRadius: '8px',
      backgroundColor: colors.backgroundColor,
      color: colors.color
    };
  };

  const roleGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '8px',
    marginBottom: '16px'
  };

  const roleCheckboxStyle = (isChecked: boolean, isDefault: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    border: `1px solid ${isChecked ? '#10b981' : '#d1d5db'}`,
    borderRadius: '6px',
    backgroundColor: isChecked ? '#ecfdf5' : 'white',
    color: isChecked ? '#059669' : '#6b7280',
    cursor: isDefault ? 'not-allowed' : 'pointer',
    opacity: isDefault ? 0.7 : 1,
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  });

  const capabilityStyle = {
    fontSize: '12px',
    color: '#374151',
    padding: '4px 8px',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    marginBottom: '4px'
  };

  const footerStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    padding: '24px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb'
  };

  const buttonStyle = (variant: 'primary' | 'secondary') => ({
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    ...(variant === 'primary' ? {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none'
    } : {
      backgroundColor: 'white',
      color: '#6b7280',
      border: '1px solid #d1d5db'
    })
  });

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <Settings size={24} />
            Profile Role Matrix
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={contentStyle}>
          <div style={gridStyle}>
            {matrixData.map((profile, profileIndex) => (
              <div key={profile.profileType} style={profileCardStyle(profile.profileType)}>
                <div style={profileHeaderStyle(profile.profileType)}>
                  {getProfileIcon(profile.profileType)}
                  <h3 style={{ margin: 0, fontWeight: '600', textTransform: 'capitalize' }}>
                    {profile.profileType.replace('_', ' ')}
                  </h3>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6b7280', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Default Role: <span style={{ color: '#059669' }}>{profile.defaultRole}</span>
                  </div>
                  
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6b7280', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Available Roles:
                  </div>
                  
                  <div style={roleGridStyle}>
                    {profile.availableRoles.map((role) => {
                      const isChecked = profile.assignedRoles.includes(role);
                      const isDefault = role === profile.defaultRole;
                      
                      return (
                        <label
                          key={role}
                          style={roleCheckboxStyle(isChecked, isDefault)}
                          onClick={() => !isDefault && handleRoleToggle(profileIndex, role)}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            disabled={isDefault}
                            style={{ 
                              margin: 0,
                              accentColor: '#10b981'
                            }}
                          />
                          {role}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6b7280', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Capabilities:
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    {profile.capabilities.map((capability) => (
                      <div key={capability} style={capabilityStyle}>
                        • {capability.replace('_', ' ')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '24px'
          }}>
            <h4 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              fontWeight: '600',
              color: '#111827'
            }}>
              Configuration Summary
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              {matrixData.map((profile) => (
                <div key={profile.profileType} style={{
                  fontSize: '12px',
                  color: '#374151'
                }}>
                  <strong style={{ textTransform: 'capitalize' }}>
                    {profile.profileType.replace('_', ' ')}:
                  </strong>
                  <div style={{ marginTop: '4px' }}>
                    {profile.assignedRoles.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={footerStyle}>
          <button
            onClick={onClose}
            style={buttonStyle('secondary')}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={buttonStyle('primary')}
          >
            <Check size={16} />
            Save Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMatrix;

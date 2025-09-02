"use client";
import React, { useState } from 'react';
import { Role, ProfileType } from '@/types';
import { X, Save, Shield, Users, Building, Eye, Award } from 'lucide-react';

interface EditRolePermissionsProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  onSave: (updatedRole: Role) => void;
}

const EditRolePermissions: React.FC<EditRolePermissionsProps> = ({
  isOpen,
  onClose,
  role,
  onSave
}) => {
  const [editedRole, setEditedRole] = useState<Role | null>(role);

  React.useEffect(() => {
    setEditedRole(role);
  }, [role]);

  if (!isOpen || !editedRole) return null;

  const handlePermissionChange = (permission: keyof Role['permissions'], value: boolean) => {
    setEditedRole(prev => {
      if (!prev) return null;
      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [permission]: value
        }
      };
    });
  };

  const handleProfileToggle = (profileType: ProfileType) => {
    setEditedRole(prev => {
      if (!prev) return null;
      const currentProfiles = prev.applicableProfiles;
      const updatedProfiles = currentProfiles.includes(profileType)
        ? currentProfiles.filter(p => p !== profileType)
        : [...currentProfiles, profileType];
      
      return {
        ...prev,
        applicableProfiles: updatedProfiles
      };
    });
  };

  const handleSave = () => {
    if (editedRole) {
      onSave(editedRole);
      onClose();
    }
  };

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
    width: '90%',
    maxWidth: '600px',
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
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    color: '#6b7280'
  };

  const contentStyle = {
    padding: '24px',
    maxHeight: 'calc(90vh - 140px)',
    overflowY: 'auto' as const
  };

  const sectionStyle = {
    marginBottom: '24px'
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '12px'
  };

  const permissionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  };

  const permissionItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  };

  const switchStyle = (checked: boolean) => ({
    position: 'relative' as const,
    display: 'inline-block',
    width: '44px',
    height: '24px',
    backgroundColor: checked ? '#10b981' : '#d1d5db',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  });

  const switchKnobStyle = (checked: boolean) => ({
    position: 'absolute' as const,
    top: '2px',
    left: checked ? '22px' : '2px',
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'left 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  });

  const profileGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '8px'
  };

  const profileItemStyle = (profileType: ProfileType, isSelected: boolean) => {
    const colors = getProfileColor(profileType);
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      border: `2px solid ${isSelected ? colors.border : '#e5e7eb'}`,
      backgroundColor: isSelected ? colors.backgroundColor : 'white',
      color: isSelected ? colors.color : '#374151',
      transition: 'all 0.2s ease'
    };
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '24px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb'
  };

  const buttonStyle = (variant: 'primary' | 'secondary') => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '8px',
    border: variant === 'primary' ? 'none' : '1px solid #d1d5db',
    backgroundColor: variant === 'primary' ? '#3b82f6' : 'white',
    color: variant === 'primary' ? 'white' : '#374151',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  });

  const allProfiles: ProfileType[] = ['basic', 'verified_professional', 'company_member', 'investor'];

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <Shield size={20} />
            Edit {editedRole.name} Permissions
          </h2>
          <button style={closeButtonStyle} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={contentStyle}>
          {/* Basic Permissions */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Basic Permissions</h3>
            <div style={permissionGridStyle}>
              <div style={permissionItemStyle}>
                <span>View</span>
                <div 
                  style={switchStyle(editedRole.permissions.view)}
                  onClick={() => handlePermissionChange('view', !editedRole.permissions.view)}
                >
                  <div style={switchKnobStyle(editedRole.permissions.view)} />
                </div>
              </div>
              <div style={permissionItemStyle}>
                <span>Edit</span>
                <div 
                  style={switchStyle(editedRole.permissions.edit)}
                  onClick={() => handlePermissionChange('edit', !editedRole.permissions.edit)}
                >
                  <div style={switchKnobStyle(editedRole.permissions.edit)} />
                </div>
              </div>
              <div style={permissionItemStyle}>
                <span>Delete</span>
                <div 
                  style={switchStyle(editedRole.permissions.delete)}
                  onClick={() => handlePermissionChange('delete', !editedRole.permissions.delete)}
                >
                  <div style={switchKnobStyle(editedRole.permissions.delete)} />
                </div>
              </div>
            </div>
          </div>

          {/* Management Permissions */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Management Permissions</h3>
            <div style={permissionGridStyle}>
              <div style={permissionItemStyle}>
                <span>Manage Users</span>
                <div 
                  style={switchStyle(editedRole.permissions.manage_users)}
                  onClick={() => handlePermissionChange('manage_users', !editedRole.permissions.manage_users)}
                >
                  <div style={switchKnobStyle(editedRole.permissions.manage_users)} />
                </div>
              </div>
              <div style={permissionItemStyle}>
                <span>Manage Projects</span>
                <div 
                  style={switchStyle(editedRole.permissions.manage_projects)}
                  onClick={() => handlePermissionChange('manage_projects', !editedRole.permissions.manage_projects)}
                >
                  <div style={switchKnobStyle(editedRole.permissions.manage_projects)} />
                </div>
              </div>
            </div>
          </div>

          {/* Applicable Profiles */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Applicable Profiles</h3>
            <div style={profileGridStyle}>
              {allProfiles.map((profileType) => {
                const isSelected = editedRole.applicableProfiles.includes(profileType);
                return (
                  <div
                    key={profileType}
                    style={profileItemStyle(profileType, isSelected)}
                    onClick={() => handleProfileToggle(profileType)}
                  >
                    {getProfileIcon(profileType)}
                    <span style={{ textTransform: 'capitalize' }}>
                      {profileType.replace('_', ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={footerStyle}>
          <button
            style={buttonStyle('secondary')}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={buttonStyle('primary')}
            onClick={handleSave}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRolePermissions;

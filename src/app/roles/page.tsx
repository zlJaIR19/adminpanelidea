"use client";
import React, { useState } from 'react';
import { mockRoles, profileRoleMatrix, verificationPermissions } from '@/data';
import { Role, ProfileType } from '@/types';
import { Shield, Users, Building, Eye, Award, Settings, UserCheck, CheckCircle, XCircle, Edit } from 'lucide-react';
import ProfileMatrix from '@/components/matrix/ProfileMatrix';
import EditRolePermissions from '@/components/modals/EditRolePermissions';

const RolesPage = () => {
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
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
      case 'basic': return { backgroundColor: '#f3f4f6', color: '#374151' };
      case 'verified_professional': return { backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'company_member': return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'investor': return { backgroundColor: '#e9d5ff', color: '#7c3aed' };
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleSaveRole = (updatedRole: Role) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === updatedRole.id ? updatedRole : role
      )
    );
  };

  const PermissionBadge = ({ permission, enabled }: { permission: string, enabled: boolean }) => {
    const badgeStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      backgroundColor: enabled ? '#dcfce7' : '#f3f4f6',
      color: enabled ? '#166534' : '#9ca3af'
    };
    
    return (
      <span style={badgeStyle}>
        {permission}
      </span>
    );
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0
  };

  const subtitleStyle = {
    color: '#6b7280',
    marginTop: '4px',
    margin: 0
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '8px'
  };

  const buttonStyle = (bgColor: string) => ({
    backgroundColor: bgColor,
    color: 'white',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  });

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Roles & Permissions</h1>
          <p style={subtitleStyle}>Manage user roles and profile-specific permissions</p>
        </div>
        <div style={buttonGroupStyle}>
          <button 
            style={buttonStyle('#10b981')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            onClick={() => setIsMatrixOpen(true)}
          >
            Profile Matrix
          </button>
          <button 
            style={buttonStyle('#3b82f6')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Create Role
          </button>
        </div>
      </div>

      {/* Role Overview Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {roles.map((role) => {
          const cardStyle = {
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '16px',
            transition: 'box-shadow 0.2s ease',
            cursor: 'pointer'
          };

          return (
            <div 
              key={role.id} 
              style={cardStyle}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ fontWeight: '600', color: '#111827', margin: 0 }}>{role.name}</h3>
                <Shield size={20} color="#9ca3af" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  <PermissionBadge permission="View" enabled={role.permissions.view} />
                  <PermissionBadge permission="Edit" enabled={role.permissions.edit} />
                  <PermissionBadge permission="Delete" enabled={role.permissions.delete} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  <PermissionBadge permission="Manage Users" enabled={role.permissions.manage_users} />
                  <PermissionBadge permission="Manage Projects" enabled={role.permissions.manage_projects} />
                </div>
              </div>
              
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', margin: 0 }}>Applicable Profiles:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {role.applicableProfiles.map((profileType) => {
                    const profileBadgeStyle = {
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '500',
                      ...getProfileColor(profileType)
                    };
                    
                    return (
                      <span key={profileType} style={profileBadgeStyle}>
                        {getProfileIcon(profileType)}
                        {profileType.replace('_', ' ')}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Role Matrix */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: 0
        }}>
          <Settings size={20} />
          Profile Role Matrix
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {Object.entries(profileRoleMatrix).map(([profileType, config]) => (
            <div key={profileType} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                {getProfileIcon(profileType as ProfileType)}
                <h3 style={{
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  margin: 0
                }}>{profileType.replace('_', ' ')}</h3>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '14px'
              }}>
                <div>
                  <span style={{ color: '#6b7280' }}>Default Role:</span>
                  <span style={{ marginLeft: '8px', fontWeight: '500' }}>{config.defaultRole}</span>
                </div>
                
                <div>
                  <span style={{ color: '#6b7280' }}>Available Roles:</span>
                  <div style={{
                    marginTop: '4px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px'
                  }}>
                    {config.availableRoles.map((role) => (
                      <span key={role} style={{
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span style={{ color: '#6b7280' }}>Capabilities:</span>
                  <div style={{
                    marginTop: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    {config.capabilities.map((capability) => (
                      <div key={capability} style={{
                        fontSize: '12px',
                        color: '#374151'
                      }}>
                        • {capability.replace('_', ' ')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Permissions */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: 0
        }}>
          <UserCheck size={20} />
          Verification Status Permissions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {Object.entries(verificationPermissions).map(([status, permissions]) => {
            const statusColors = {
              pending: { border: '#fbbf24', background: '#fffbeb' },
              verified: { border: '#10b981', background: '#ecfdf5' },
              rejected: { border: '#ef4444', background: '#fef2f2' },
              expired: { border: '#6b7280', background: '#f9fafb' }
            };
            
            const colors = statusColors[status as keyof typeof statusColors];
            
            return (
              <div key={status} style={{
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.background,
                borderRadius: '8px',
                padding: '16px'
              }}>
                <h3 style={{
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  marginBottom: '12px',
                  margin: 0
                }}>{status}</h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '14px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>Public Profile:</span>
                    <span style={{
                      color: permissions.canCreatePublicProfile ? '#059669' : '#dc2626'
                    }}>
                      {permissions.canCreatePublicProfile ? '✓' : '✗'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>Accept Assignments:</span>
                    <span style={{
                      color: permissions.canAcceptAssignments ? '#059669' : '#dc2626'
                    }}>
                      {permissions.canAcceptAssignments ? '✓' : '✗'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>Verification Badge:</span>
                    <span style={{
                      color: permissions.showVerificationBadge ? '#059669' : '#dc2626'
                    }}>
                      {permissions.showVerificationBadge ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Roles Table */}
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: 0
          }}>Detailed Role Permissions</h2>
        </div>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{
                padding: '12px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Role Name
              </th>
              <th style={{
                padding: '12px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Basic Permissions
              </th>
              <th style={{
                padding: '12px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Management Permissions
              </th>
              <th style={{
                padding: '12px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Applicable Profiles
              </th>
              <th style={{
                padding: '12px 24px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {roles.map((role: Role) => (
              <tr 
                key={role.id} 
                style={{
                  borderBottom: '1px solid #e5e7eb',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={{
                  padding: '16px 24px',
                  whiteSpace: 'nowrap'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Shield size={20} color="#9ca3af" style={{ marginRight: '8px' }} />
                    <span style={{
                      fontWeight: '500',
                      color: '#111827'
                    }}>{role.name}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px'
                  }}>
                    <PermissionBadge permission="View" enabled={role.permissions.view} />
                    <PermissionBadge permission="Edit" enabled={role.permissions.edit} />
                    <PermissionBadge permission="Delete" enabled={role.permissions.delete} />
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px'
                  }}>
                    <PermissionBadge permission="Manage Users" enabled={role.permissions.manage_users} />
                    <PermissionBadge permission="Manage Projects" enabled={role.permissions.manage_projects} />
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px'
                  }}>
                    {role.applicableProfiles.map((profileType) => {
                      const profileBadgeStyle = {
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '500',
                        ...getProfileColor(profileType)
                      };
                      
                      return (
                        <span key={profileType} style={profileBadgeStyle}>
                          {getProfileIcon(profileType)}
                          {profileType.replace('_', ' ')}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td style={{ 
                  padding: '16px 24px',
                  textAlign: 'center'
                }}>
                  <button
                    onClick={() => handleEditRole(role)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 12px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Profile Matrix Modal */}
      <ProfileMatrix
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
      />

      {/* Edit Role Permissions Modal */}
      <EditRolePermissions
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        role={selectedRole}
        onSave={handleSaveRole}
      />
    </div>
  );
};

export default RolesPage;

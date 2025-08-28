"use client";
import React from 'react';
import { mockUsers } from '@/data';
import { User, ProfileType } from '@/types';
import { Shield, Award, Building, Eye, User as UserIcon, Briefcase, Edit } from 'lucide-react';
import EditUserModal from '@/components/modals/EditUserModal';

const ProfileTypeBadge = ({ profileTypes, currentContext }: { profileTypes: ProfileType[], currentContext: ProfileType }) => {
  const getProfileIcon = (type: ProfileType) => {
    switch (type) {
      case 'basic': return <UserIcon size={12} />;
      case 'verified_professional': return <Award size={12} />;
      case 'company_member': return <Building size={12} />;
      case 'investor': return <Eye size={12} />;
    }
  };

  const getProfileColor = (type: ProfileType) => {
    switch (type) {
      case 'basic': return { backgroundColor: '#f3f4f6', color: '#374151' };
      case 'verified_professional': return { backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'company_member': return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'investor': return { backgroundColor: '#e9d5ff', color: '#7c3aed' };
    }
  };

  const getProfileLabel = (type: ProfileType) => {
    switch (type) {
      case 'basic': return 'Basic';
      case 'verified_professional': return 'VP';
      case 'company_member': return 'Company';
      case 'investor': return 'Investor';
    }
  };

  const badgeStyle = (type: ProfileType) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500',
    ...getProfileColor(type),
    border: type === currentContext ? '2px solid #3b82f6' : 'none'
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
      {profileTypes.map((type) => (
        <span key={type} style={badgeStyle(type)}>
          {getProfileIcon(type)}
          {getProfileLabel(type)}
        </span>
      ))}
    </div>
  );
};

const VerificationBadge = ({ status }: { status?: string }) => {
  if (!status) return null;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'pending': return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'rejected': return { backgroundColor: '#fee2e2', color: '#991b1b' };
      case 'expired': return { backgroundColor: '#f3f4f6', color: '#374151' };
      default: return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500',
    ...getStatusColor(status)
  };

  return (
    <span style={badgeStyle}>
      <Shield size={12} />
      {status}
    </span>
  );
};

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  const containerStyle = {
    padding: '0'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '8px'
  };

  const buttonStyle = (bgColor: string) => ({
    backgroundColor: bgColor,
    color: 'white',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  });

  const tableContainerStyle = {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const
  };

  const thStyle = {
    padding: '16px 20px',
    borderBottom: '2px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    textAlign: 'left' as const,
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  };

  const tdStyle = {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: 'white',
    fontSize: '14px'
  };

  const rowStyle = {
    transition: 'background-color 0.15s ease'
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: '#d1d5db',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const userInfoStyle = {
    marginLeft: '12px'
  };

  const nameStyle = {
    color: '#111827',
    fontWeight: '500',
    margin: '0 0 4px 0'
  };

  const emailStyle = {
    color: '#6b7280',
    fontSize: '12px',
    margin: 0
  };

  const phoneStyle = {
    color: '#9ca3af',
    fontSize: '12px',
    margin: 0
  };

  const statusBadgeStyle = (status: string) => {
    const colors = {
      active: { bg: '#dcfce7', text: '#166534' },
      inactive: { bg: '#fef3c7', text: '#92400e' },
      deactivated: { bg: '#fee2e2', text: '#991b1b' }
    };
    const color = colors[status as keyof typeof colors] || colors.inactive;
    
    return {
      position: 'relative' as const,
      display: 'inline-block',
      padding: '4px 12px',
      fontWeight: '600',
      borderRadius: '9999px',
      fontSize: '12px',
      backgroundColor: color.bg,
      color: color.text
    };
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>User Management</h1>
        <div style={buttonGroupStyle}>
          <button 
            style={buttonStyle('#10b981')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            Verify Professional
          </button>
          <button 
            style={buttonStyle('#3b82f6')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Create User
          </button>
        </div>
      </div>
      
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>User Details</th>
              <th style={thStyle}>Profile Types</th>
              <th style={thStyle}>Professional Info</th>
              <th style={thStyle}>Company/Role</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user: User) => (
              <tr 
                key={user.id} 
                style={rowStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={avatarStyle}>
                      <UserIcon size={20} color="#6b7280" />
                    </div>
                    <div style={userInfoStyle}>
                      <p style={nameStyle}>{user.name}</p>
                      <p style={emailStyle}>{user.email}</p>
                      {user.phone && <p style={phoneStyle}>{user.phone}</p>}
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>
                  <ProfileTypeBadge 
                    profileTypes={user.profileTypes} 
                    currentContext={user.currentContext} 
                  />
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', margin: 0 }}>
                    Current: {user.currentContext.replace('_', ' ')}
                  </p>
                </td>
                <td style={tdStyle}>
                  {user.verifiedProfessional ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <VerificationBadge status={user.verifiedProfessional.verificationStatus} />
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                        {user.verifiedProfessional.professionalCategory.replace('_', ' ')}
                      </p>
                      {user.verifiedProfessional.licenseNumber && (
                        <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                          License: {user.verifiedProfessional.licenseNumber}
                        </p>
                      )}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                        {user.verifiedProfessional.specializations.slice(0, 2).map((spec, idx) => (
                          <span key={idx} style={{
                            backgroundColor: '#eff6ff',
                            color: '#1d4ed8',
                            fontSize: '12px',
                            padding: '2px 8px',
                            borderRadius: '4px'
                          }}>
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : user.investor ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: '#e9d5ff',
                        color: '#7c3aed'
                      }}>
                        <Eye size={12} />
                        {user.investor.accessLevel} access
                      </span>
                      <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                        Shareholder verified: {user.investor.shareholderVerified ? 'Yes' : 'No'}
                      </p>
                    </div>
                  ) : (
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>Basic user</span>
                  )}
                </td>
                <td style={tdStyle}>
                  {user.companyMember ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <p style={{ color: '#111827', fontWeight: '500', margin: 0 }}>
                        {user.companyMember.companyName}
                      </p>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        width: 'fit-content'
                      }}>
                        <Briefcase size={12} />
                        {user.companyMember.role}
                      </span>
                      <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                        Projects: {user.companyMember.assignedProjects.length}
                      </p>
                    </div>
                  ) : (
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>Independent</span>
                  )}
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={statusBadgeStyle(user.status)}>
                      {user.status}
                    </span>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                      Last: {new Date(user.lastActivity).toLocaleDateString()}
                    </p>
                  </div>
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEditUser(user)}
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                    title="Edit User"
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

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={(updatedUser) => {
          // Update user in localStorage for demo purposes
          const users = JSON.parse(localStorage.getItem('mockUsers') || JSON.stringify(mockUsers));
          const userIndex = users.findIndex((u: User) => u.id === updatedUser.id);
          if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('mockUsers', JSON.stringify(users));
          }
          setIsEditModalOpen(false);
          setSelectedUser(null);
          // Force re-render by updating the page
          window.location.reload();
        }}
      />
    </div>
  );
};

export default UsersPage;

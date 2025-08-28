"use client";
import React from 'react';
import { mockUsers } from '@/data';
import { Shield, CheckCircle, XCircle, Clock, AlertTriangle, FileText, Award } from 'lucide-react';

const VerificationManagement = () => {
  const verificationUsers = mockUsers.filter(u => u.verifiedProfessional);
  
  const pendingUsers = verificationUsers.filter(u => u.verifiedProfessional?.verificationStatus === 'pending');
  const verifiedUsers = verificationUsers.filter(u => u.verifiedProfessional?.verificationStatus === 'verified');
  const rejectedUsers = verificationUsers.filter(u => u.verifiedProfessional?.verificationStatus === 'rejected');
  const expiredUsers = verificationUsers.filter(u => u.verifiedProfessional?.verificationStatus === 'expired');

  const StatusBadge = ({ status }: { status: string }) => {
    const configs = {
      pending: { color: { backgroundColor: '#fef3c7', color: '#92400e' }, icon: Clock },
      verified: { color: { backgroundColor: '#dcfce7', color: '#166534' }, icon: CheckCircle },
      rejected: { color: { backgroundColor: '#fee2e2', color: '#991b1b' }, icon: XCircle },
      expired: { color: { backgroundColor: '#f3f4f6', color: '#374151' }, icon: AlertTriangle }
    };
    
    const config = configs[status as keyof typeof configs];
    const Icon = config.icon;
    
    const badgeStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      ...config.color
    };
    
    return (
      <span style={badgeStyle}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  const CategoryBadge = ({ category }: { category: string }) => {
    const colors = {
      licensed_contractor: { backgroundColor: '#dbeafe', color: '#1e40af' },
      industry_expert: { backgroundColor: '#e9d5ff', color: '#7c3aed' },
      engineer: { backgroundColor: '#dcfce7', color: '#166534' },
      technician: { backgroundColor: '#fed7aa', color: '#c2410c' }
    };
    
    const badgeStyle = {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      ...(colors[category as keyof typeof colors] || { backgroundColor: '#f3f4f6', color: '#374151' })
    };
    
    return (
      <span style={badgeStyle}>
        {category.replace('_', ' ')}
      </span>
    );
  };

  const VerificationCard = ({ user, showActions = false }: { user: any, showActions?: boolean }) => {
    const cardStyle = {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '16px',
      transition: 'box-shadow 0.2s ease',
      cursor: 'pointer'
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

    return (
      <div 
        style={cardStyle}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={avatarStyle}>
              <Award size={20} color="#6b7280" />
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#111827', margin: 0 }}>{user.name}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{user.email}</p>
            </div>
          </div>
          <StatusBadge status={user.verifiedProfessional.verificationStatus} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Category:</span>
            <CategoryBadge category={user.verifiedProfessional.professionalCategory} />
          </div>
          
          {user.verifiedProfessional.licenseNumber && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>License:</span>
              <span style={{
                fontSize: '14px',
                fontFamily: 'monospace',
                backgroundColor: '#f3f4f6',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                {user.verifiedProfessional.licenseNumber}
              </span>
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Regions:</span>
            <span style={{ fontSize: '14px' }}>{user.verifiedProfessional.workRegion.join(', ')}</span>
          </div>
          
          {user.verifiedProfessional.verificationDate && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Verified:</span>
              <span style={{ fontSize: '14px' }}>{new Date(user.verifiedProfessional.verificationDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', margin: 0 }}>Specializations:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {user.verifiedProfessional.specializations.map((spec: string, idx: number) => (
              <span key={idx} style={{
                display: 'inline-block',
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
        
        {showActions && (
          <div style={{
            display: 'flex',
            gap: '8px',
            paddingTop: '12px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button style={{
              flex: 1,
              backgroundColor: '#10b981',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              Approve
            </button>
            <button style={{
              flex: 1,
              backgroundColor: '#ef4444',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
            >
              Reject
            </button>
            <button style={{
              backgroundColor: '#6b7280',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
            >
              <FileText size={16} />
            </button>
          </div>
        )}
      </div>
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
          <h1 style={titleStyle}>Verification Management</h1>
          <p style={subtitleStyle}>Review and manage professional credential verifications</p>
        </div>
        <div style={buttonGroupStyle}>
          <button 
            style={buttonStyle('#3b82f6')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Bulk Actions
          </button>
          <button 
            style={buttonStyle('#10b981')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <div style={{
          backgroundColor: '#fffbeb',
          border: '1px solid #fbbf24',
          padding: '16px',
          borderRadius: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <Clock size={20} color="#d97706" />
            <span style={{
              fontWeight: '500',
              color: '#92400e'
            }}>Pending Review</span>
          </div>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#78350f',
            margin: 0
          }}>{pendingUsers.length}</p>
        </div>
        
        <div style={{
          backgroundColor: '#ecfdf5',
          border: '1px solid #10b981',
          padding: '16px',
          borderRadius: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <CheckCircle size={20} color="#059669" />
            <span style={{
              fontWeight: '500',
              color: '#166534'
            }}>Verified</span>
          </div>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#14532d',
            margin: 0
          }}>{verifiedUsers.length}</p>
        </div>
        
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #ef4444',
          padding: '16px',
          borderRadius: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <XCircle size={20} color="#dc2626" />
            <span style={{
              fontWeight: '500',
              color: '#991b1b'
            }}>Rejected</span>
          </div>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#7f1d1d',
            margin: 0
          }}>{rejectedUsers.length}</p>
        </div>
        
        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #6b7280',
          padding: '16px',
          borderRadius: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <AlertTriangle size={20} color="#4b5563" />
            <span style={{
              fontWeight: '500',
              color: '#374151'
            }}>Expired</span>
          </div>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#111827',
            margin: 0
          }}>{expiredUsers.length}</p>
        </div>
      </div>

      {/* Pending Verifications */}
      {pendingUsers.length > 0 && (
        <div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: 0
          }}>
            <Clock size={20} color="#d97706" />
            Pending Verifications ({pendingUsers.length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '16px'
          }}>
            {pendingUsers.map((user) => (
              <VerificationCard key={user.id} user={user} showActions={true} />
            ))}
          </div>
        </div>
      )}

      {/* Verified Professionals */}
      <div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: 0
        }}>
          <Shield size={20} color="#059669" />
          Verified Professionals ({verifiedUsers.length})
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {verifiedUsers.map((user) => (
            <VerificationCard key={user.id} user={user} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
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
          margin: 0
        }}>Recent Verification Activity</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            backgroundColor: '#ecfdf5',
            borderRadius: '8px'
          }}>
            <CheckCircle size={20} color="#059669" />
            <div>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                margin: 0
              }}>Lula da Silva verified as Licensed Contractor</p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0
              }}>2 days ago</p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            backgroundColor: '#fffbeb',
            borderRadius: '8px'
          }}>
            <Clock size={20} color="#d97706" />
            <div>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                margin: 0
              }}>New verification request from John Smith</p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0
              }}>5 days ago</p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            backgroundColor: '#eff6ff',
            borderRadius: '8px'
          }}>
            <FileText size={20} color="#2563eb" />
            <div>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                margin: 0
              }}>License renewal processed for 3 professionals</p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0
              }}>1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationManagement;

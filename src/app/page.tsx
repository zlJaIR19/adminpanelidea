"use client";
import { mockCompanies, mockProjects, mockUsers } from '@/data';
import { User, ProfileType } from '@/types';
import { Users, Building, Award, Eye, TrendingUp, Activity, Shield, Briefcase } from 'lucide-react';

const DashboardPage = () => {
  // Calculate profile type statistics
  const profileStats = mockUsers.reduce((acc, user) => {
    user.profileTypes.forEach(type => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {} as Record<ProfileType, number>);

  const verifiedProfessionals = mockUsers.filter(u => u.verifiedProfessional?.verificationStatus === 'verified').length;
  const pendingVerifications = mockUsers.filter(u => u.verifiedProfessional?.verificationStatus === 'pending').length;
  const companyMembers = mockUsers.filter(u => u.companyMember).length;
  const investors = mockUsers.filter(u => u.investor).length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    subtitle?: string;
  }) => {
    const cardStyle = {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.2s ease',
      cursor: 'pointer'
    };

    const headerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    };

    const titleStyle = {
      fontSize: '18px',
      fontWeight: '600',
      color: '#374151',
      margin: '0 0 8px 0'
    };

    const valueStyle = {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#111827',
      margin: '0'
    };

    const subtitleStyle = {
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '4px',
      margin: 0
    };

    const iconContainerStyle = {
      padding: '12px',
      borderRadius: '50%',
      backgroundColor: color
    };

    return (
      <div 
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }}
      >
        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>{title}</h2>
            <p style={valueStyle}>{value}</p>
            {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
          </div>
          <div style={iconContainerStyle}>
            <Icon size={24} color="white" />
          </div>
        </div>
      </div>
    );
  };

  const containerStyle = {
    padding: '0'
  };

  const headerStyle = {
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 8px 0'
  };

  const subtitleStyle = {
    color: '#6b7280',
    marginTop: '8px',
    margin: 0
  };

  const metricsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  };

  const chartsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  };

  const chartCardStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  };

  const chartHeaderStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const statRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  };

  const statLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const dotStyle = (color: string) => ({
    width: '12px',
    height: '12px',
    backgroundColor: color,
    borderRadius: '50%'
  });

  const activityCardStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  };

  const activityItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6'
  };

  const avatarStyle = {
    width: '32px',
    height: '32px',
    backgroundColor: '#d1d5db',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>HVAC AI Admin Home</h1>
        <p style={subtitleStyle}>Comprehensive platform overview and user profile management</p>
      </div>

      {/* Core Metrics */}
      <div style={metricsGridStyle}>
        <StatCard
          title="Total Users"
          value={mockUsers.length}
          icon={Users}
          color="#3b82f6"
          subtitle={`${activeUsers} active`}
        />
        <StatCard
          title="Companies"
          value={mockCompanies.length}
          icon={Building}
          color="#10b981"
          subtitle="Registered businesses"
        />
        <StatCard
          title="Active Projects"
          value={mockProjects.filter((p) => p.status === 'in_progress').length}
          icon={Briefcase}
          color="#8b5cf6"
          subtitle="In progress"
        />
        <StatCard
          title="Verified Professionals"
          value={verifiedProfessionals}
          icon={Award}
          color="#f59e0b"
          subtitle={`${pendingVerifications} pending`}
        />
      </div>

      {/* Profile Type Breakdown */}
      <div style={chartsGridStyle}>
        <div style={chartCardStyle}>
          <h2 style={chartHeaderStyle}>
            <Activity size={20} />
            Profile Type Distribution
          </h2>
          <div>
            <div style={statRowStyle}>
              <div style={statLabelStyle}>
                <div style={dotStyle('#3b82f6')}></div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Verified Professionals</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{profileStats.verified_professional || 0}</span>
            </div>
            <div style={statRowStyle}>
              <div style={statLabelStyle}>
                <div style={dotStyle('#10b981')}></div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Company Members</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{profileStats.company_member || 0}</span>
            </div>
            <div style={statRowStyle}>
              <div style={statLabelStyle}>
                <div style={dotStyle('#8b5cf6')}></div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Investors</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{profileStats.investor || 0}</span>
            </div>
            <div style={statRowStyle}>
              <div style={statLabelStyle}>
                <div style={dotStyle('#6b7280')}></div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Basic Users</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{profileStats.basic || 0}</span>
            </div>
          </div>
        </div>

        <div style={chartCardStyle}>
          <h2 style={chartHeaderStyle}>
            <Shield size={20} />
            Verification Status
          </h2>
          <div>
            <div style={statRowStyle}>
              <div style={statLabelStyle}>
                <div style={dotStyle('#10b981')}></div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Verified</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{verifiedProfessionals}</span>
            </div>
            <div style={statRowStyle}>
              <div style={statLabelStyle}>
                <div style={dotStyle('#f59e0b')}></div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Pending Review</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{pendingVerifications}</span>
            </div>
            <div style={statRowStyle}>
              <div style={statLabelStyle}>
                <div style={dotStyle('#ef4444')}></div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Rejected/Expired</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {mockUsers.filter(u => 
                  u.verifiedProfessional?.verificationStatus === 'rejected' || 
                  u.verifiedProfessional?.verificationStatus === 'expired'
                ).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={activityCardStyle}>
        <h2 style={chartHeaderStyle}>
          <TrendingUp size={20} />
          Recent User Activity
        </h2>
        <div>
          {mockUsers
            .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
            .slice(0, 5)
            .map((user, index) => (
              <div key={user.id} style={{
                ...activityItemStyle,
                borderBottom: index === 4 ? 'none' : '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={avatarStyle}>
                    <Users size={16} color="#6b7280" />
                  </div>
                  <div>
                    <p style={{ fontWeight: '500', fontSize: '14px', margin: 0 }}>{user.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {user.currentContext.replace('_', ' ')} • {user.companyMember?.companyName || 'Independent'}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                    {new Date(user.lastActivity).toLocaleDateString()}
                  </p>
                  <div style={{ display: 'flex', gap: '4px', marginTop: '4px', justifyContent: 'flex-end' }}>
                    {user.profileTypes.map((type) => {
                      const colors = {
                        basic: '#f3f4f6',
                        verified_professional: '#dbeafe',
                        company_member: '#dcfce7',
                        investor: '#e9d5ff'
                      };
                      return (
                        <div key={type} style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: colors[type]
                        }}></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

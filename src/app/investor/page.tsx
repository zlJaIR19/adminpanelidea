"use client";
import React from 'react';
import { mockUsers, mockCompanies, mockProjects } from '@/data';
import { TrendingUp, Users, Building, Activity, MapPin, Calendar, BarChart3, Eye } from 'lucide-react';

const InvestorDashboard = () => {
  // Calculate growth metrics
  const totalUsers = mockUsers.length;
  const totalCompanies = mockCompanies.length;
  const verifiedProfessionals = mockUsers.filter(u => u.verifiedProfessional?.verificationStatus === 'verified').length;
  const activeProjects = mockProjects.filter(p => p.status === 'in_progress').length;
  const completedProjects = mockProjects.filter(p => p.status === 'completed').length;

  // Subscription distribution
  const subscriptionStats = mockCompanies.reduce((acc, company) => {
    acc[company.subscriptionPlan] = (acc[company.subscriptionPlan] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Geographic distribution (mock data)
  const geographicData = [
    { region: 'Texas', companies: 8, users: 45, growth: '+12%' },
    { region: 'California', companies: 6, users: 38, growth: '+8%' },
    { region: 'Florida', companies: 4, users: 22, growth: '+15%' },
    { region: 'New York', companies: 3, users: 18, growth: '+5%' },
    { region: 'Illinois', companies: 2, users: 12, growth: '+20%' },
  ];

  // Recent activity feed (mock data)
  const activityFeed = [
    { type: 'company_signup', message: 'New company "Arctic Solutions" joined', time: '2 hours ago' },
    { type: 'verification', message: '3 professionals verified this week', time: '1 day ago' },
    { type: 'project_completion', message: '5 projects completed this month', time: '2 days ago' },
    { type: 'feature_release', message: 'Profile switching feature deployed', time: '1 week ago' },
    { type: 'milestone', message: 'Reached 50+ verified professionals', time: '2 weeks ago' },
  ];

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: any;
    trend?: string;
  }) => {
    const cardStyle = {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    };

    const iconContainerStyle = {
      padding: '8px',
      backgroundColor: '#e9d5ff',
      borderRadius: '8px'
    };

    const trendStyle = {
      fontSize: '14px',
      fontWeight: '500',
      color: trend?.startsWith('+') ? '#059669' : '#dc2626'
    };

    return (
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={iconContainerStyle}>
            <Icon size={24} color="#7c3aed" />
          </div>
          {trend && (
            <span style={trendStyle}>
              {trend}
            </span>
          )}
        </div>
        <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '4px', margin: 0 }}>{value}</h3>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{title}</p>
        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px', margin: 0 }}>{subtitle}</p>
      </div>
    );
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  };

  const headerStyle = {
    background: 'linear-gradient(to right, #7c3aed, #2563eb)',
    color: 'white',
    padding: '24px',
    borderRadius: '12px'
  };

  const headerTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0
  };

  const subtitleStyle = {
    color: '#c4b5fd',
    margin: 0
  };

  const badgeContainerStyle = {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px'
  };

  const badgeStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '4px 12px',
    borderRadius: '9999px'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={headerTitleStyle}>
          <Eye size={32} />
          <h1 style={titleStyle}>Investor Dashboard</h1>
        </div>
        <p style={subtitleStyle}>
          Real-time platform analytics and growth metrics for 309 Technology shareholders
        </p>
        <div style={badgeContainerStyle}>
          <span style={badgeStyle}>Advanced Access</span>
          <span style={badgeStyle}>Last 30 Days</span>
        </div>
      </div>

      {/* Core Growth Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
      }}>
        <MetricCard
          title="Total Platform Users"
          value={totalUsers}
          subtitle="Across all profile types"
          icon={Users}
          trend="+18%"
        />
        <MetricCard
          title="Registered Companies"
          value={totalCompanies}
          subtitle="Active businesses"
          icon={Building}
          trend="+12%"
        />
        <MetricCard
          title="Verified Professionals"
          value={verifiedProfessionals}
          subtitle="Credentialed experts"
          icon={TrendingUp}
          trend="+25%"
        />
        <MetricCard
          title="Active Projects"
          value={activeProjects}
          subtitle={`${completedProjects} completed`}
          icon={Activity}
          trend="+8%"
        />
      </div>

      {/* Detailed Analytics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* Subscription Distribution */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
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
            <BarChart3 size={20} />
            Subscription Distribution
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(subscriptionStats).map(([plan, count]) => {
              const colors = {
                'Basic': '#6b7280',
                'Pro': '#3b82f6',
                'Enterprise': '#7c3aed'
              };
              const percentage = Math.round((count / totalCompanies) * 100);
              
              return (
                <div key={plan} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500' }}>{plan}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{count} companies ({percentage}%)</span>
                  </div>
                  <div style={{
                    width: '100%',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '9999px',
                    height: '8px'
                  }}>
                    <div style={{
                      height: '8px',
                      borderRadius: '9999px',
                      backgroundColor: colors[plan as keyof typeof colors] || '#6b7280',
                      width: `${percentage}%`,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
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
            <MapPin size={20} />
            Geographic Distribution
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {geographicData.map((region, index) => (
              <div key={region.region} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                paddingBottom: '8px',
                borderBottom: index < geographicData.length - 1 ? '1px solid #f3f4f6' : 'none'
              }}>
                <div>
                  <p style={{ fontWeight: '500', margin: 0 }}>{region.region}</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    {region.companies} companies • {region.users} users
                  </p>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#059669' }}>{region.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed & Time Range Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
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
            <Activity size={20} />
            Recent Platform Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activityFeed.map((activity, index) => {
              const iconColors = {
                company_signup: { bg: '#ecfdf5', text: '#059669' },
                verification: { bg: '#eff6ff', text: '#2563eb' },
                project_completion: { bg: '#f3e8ff', text: '#7c3aed' },
                feature_release: { bg: '#fffbeb', text: '#d97706' },
                milestone: { bg: '#fef2f2', text: '#dc2626' }
              };
              
              const colors = iconColors[activity.type as keyof typeof iconColors];
              
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: colors.bg
                  }}>
                    <Activity size={16} color={colors.text} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#111827',
                      margin: 0
                    }}>{activity.message}</p>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginTop: '4px',
                      margin: 0
                    }}>{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Time Range Filters */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
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
            <Calendar size={20} />
            Time Range
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px',
              backgroundColor: '#f3e8ff',
              border: '1px solid #c084fc',
              borderRadius: '8px',
              fontWeight: '500',
              color: '#7c3aed',
              cursor: 'pointer'
            }}>
              Last 30 Days
            </button>
            <button style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Last 7 Days
            </button>
            <button style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              This Quarter
            </button>
            <button style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Custom Range
            </button>
          </div>

          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontWeight: '600',
              marginBottom: '12px',
              margin: 0
            }}>Quick Stats</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '14px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: '#6b7280' }}>Avg. Daily Signups</span>
                <span style={{ fontWeight: '500' }}>2.3</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: '#6b7280' }}>Platform Uptime</span>
                <span style={{ fontWeight: '500', color: '#059669' }}>99.9%</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: '#6b7280' }}>Support Tickets</span>
                <span style={{ fontWeight: '500' }}>12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;

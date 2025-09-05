"use client";
import React, { useState, useEffect } from 'react';
import { mockCompanies, mockProjects, mockUsers, mockEquipment } from '@/data';
import { User, ProfileType } from '@/types';
import { UserType } from '@/types/auth';
import { Users, Building, Award, Eye, TrendingUp, Activity, Shield, Briefcase, DollarSign, HardHat, AlertCircle, CheckCircle, Download, Plus, Settings } from 'lucide-react';
import DashboardWidget, { WidgetData } from '@/components/analytics/DashboardWidget';

const DashboardPage = () => {
  const [currentUserType, setCurrentUserType] = useState<UserType>('company_owner');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Get current user type from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const authUser = localStorage.getItem('auth_user');
        if (authUser) {
          const user = JSON.parse(authUser);
          setCurrentUserType(user.userType || 'company_owner');
        }
      } catch (error) {
        console.error('Error reading user type:', error);
      }
    }
  }, []);

  // Calculate comprehensive statistics
  const stats = {
    users: {
      total: mockUsers.length,
      active: mockUsers.filter(u => u.status === 'active').length,
      verified: mockUsers.filter(u => u.verifiedProfessional?.verificationStatus === 'verified').length,
      pending: mockUsers.filter(u => u.verifiedProfessional?.verificationStatus === 'pending').length
    },
    companies: {
      total: mockCompanies.length,
      active: mockCompanies.filter(c => c.status === 'active').length,
      revenue: mockCompanies.reduce((sum, c) => sum + (c.users * 50), 0) // Mock revenue calculation
    },
    projects: {
      total: mockProjects.length,
      inProgress: mockProjects.filter(p => p.status === 'in_progress').length,
      completed: mockProjects.filter(p => p.status === 'completed').length,
      onHold: mockProjects.filter(p => p.status === 'on_hold').length
    },
    equipment: {
      total: mockEquipment.length,
      inStock: mockEquipment.filter(e => e.status === 'In Stock').length,
      limited: mockEquipment.filter(e => e.status === 'Limited').length,
      outOfStock: mockEquipment.filter(e => e.status === 'OOS').length,
      totalValue: mockEquipment.reduce((sum, e) => sum + e.price, 0)
    }
  };

  // Role-based widget configurations
  const getRoleBasedWidgets = (): WidgetData[] => {
    const baseWidgets: WidgetData[] = [];

    switch (currentUserType) {
      case 'super_admin':
        return [
          {
            id: 'total-users',
            title: 'Total Platform Users',
            value: stats.users.total,
            change: { value: 12, type: 'increase', period: 'vs last month' },
            icon: <Users size={20} />,
            color: '#3b82f6',
            description: `${stats.users.active} active, ${stats.users.pending} pending verification`
          },
          {
            id: 'total-companies',
            title: 'Active Companies',
            value: stats.companies.active,
            change: { value: 8, type: 'increase', period: 'vs last month' },
            icon: <Building size={20} />,
            color: '#10b981',
            description: `${stats.companies.total} total companies registered`
          },
          {
            id: 'platform-revenue',
            title: 'Platform Revenue',
            value: `$${(stats.companies.revenue / 1000).toFixed(1)}K`,
            change: { value: 15, type: 'increase', period: 'vs last month' },
            icon: <DollarSign size={20} />,
            color: '#f59e0b',
            description: 'Monthly recurring revenue from subscriptions'
          },
          {
            id: 'total-projects',
            title: 'Platform Projects',
            value: stats.projects.total,
            change: { value: 23, type: 'increase', period: 'vs last month' },
            icon: <Briefcase size={20} />,
            color: '#8b5cf6',
            description: `${stats.projects.inProgress} in progress, ${stats.projects.completed} completed`
          },
          {
            id: 'equipment-value',
            title: 'Equipment Catalog Value',
            value: `$${(stats.equipment.totalValue / 1000).toFixed(0)}K`,
            change: { value: 5, type: 'increase', period: 'vs last month' },
            icon: <HardHat size={20} />,
            color: '#ef4444',
            description: `${stats.equipment.total} items in catalog`
          },
          {
            id: 'verification-pending',
            title: 'Pending Verifications',
            value: stats.users.pending,
            change: { value: -10, type: 'decrease', period: 'vs last week' },
            icon: <AlertCircle size={20} />,
            color: '#f97316',
            description: 'Professional verification applications'
          }
        ];

      case 'company_owner':
        return [
          {
            id: 'company-users',
            title: 'Company Users',
            value: stats.users.active,
            change: { value: 5, type: 'increase', period: 'vs last month' },
            icon: <Users size={20} />,
            color: '#3b82f6',
            description: 'Active team members'
          },
          {
            id: 'company-projects',
            title: 'Active Projects',
            value: stats.projects.inProgress,
            change: { value: 18, type: 'increase', period: 'vs last month' },
            icon: <Briefcase size={20} />,
            color: '#10b981',
            description: `${stats.projects.completed} completed this month`
          },
          {
            id: 'equipment-inventory',
            title: 'Equipment Available',
            value: stats.equipment.inStock,
            change: { value: -3, type: 'decrease', period: 'vs last week' },
            icon: <HardHat size={20} />,
            color: '#8b5cf6',
            description: `${stats.equipment.limited} limited stock items`
          },
          {
            id: 'verified-professionals',
            title: 'Verified Professionals',
            value: stats.users.verified,
            change: { value: 12, type: 'increase', period: 'vs last month' },
            icon: <CheckCircle size={20} />,
            color: '#059669',
            description: 'Team members with professional verification'
          }
        ];

      case 'company_it_admin':
        return [
          {
            id: 'user-management',
            title: 'Managed Users',
            value: stats.users.total,
            change: { value: 8, type: 'increase', period: 'vs last month' },
            icon: <Users size={20} />,
            color: '#3b82f6',
            description: `${stats.users.active} active users under management`
          },
          {
            id: 'system-health',
            title: 'System Health',
            value: '99.9%',
            change: { value: 0.1, type: 'increase', period: 'uptime' },
            icon: <Activity size={20} />,
            color: '#10b981',
            description: 'Platform availability and performance'
          },
          {
            id: 'security-alerts',
            title: 'Security Alerts',
            value: 2,
            change: { value: -50, type: 'decrease', period: 'vs last week' },
            icon: <Shield size={20} />,
            color: '#f97316',
            description: 'Active security incidents requiring attention'
          },
          {
            id: 'role-assignments',
            title: 'Role Assignments',
            value: stats.users.active,
            change: { value: 3, type: 'increase', period: 'this week' },
            icon: <Settings size={20} />,
            color: '#8b5cf6',
            description: 'Recent role and permission updates'
          }
        ];

      case 'company_manager':
        return [
          {
            id: 'project-overview',
            title: 'Projects Overview',
            value: stats.projects.inProgress,
            change: { value: 10, type: 'increase', period: 'vs last month' },
            icon: <Briefcase size={20} />,
            color: '#3b82f6',
            description: 'Currently active projects'
          },
          {
            id: 'team-performance',
            title: 'Team Performance',
            value: '94%',
            change: { value: 2, type: 'increase', period: 'vs last month' },
            icon: <TrendingUp size={20} />,
            color: '#10b981',
            description: 'Average project completion rate'
          },
          {
            id: 'equipment-utilization',
            title: 'Equipment Utilization',
            value: '87%',
            change: { value: 5, type: 'increase', period: 'vs last month' },
            icon: <HardHat size={20} />,
            color: '#f59e0b',
            description: 'Equipment usage across active projects'
          },
          {
            id: 'compliance-status',
            title: 'Compliance Status',
            value: '98%',
            change: { value: 1, type: 'increase', period: 'vs last month' },
            icon: <CheckCircle size={20} />,
            color: '#059669',
            description: 'Regulatory compliance score'
          }
        ];

      case 'investor':
        return [
          {
            id: 'platform-growth',
            title: 'Platform Growth',
            value: `${stats.users.total}`,
            change: { value: 25, type: 'increase', period: 'vs last quarter' },
            icon: <TrendingUp size={20} />,
            color: '#10b981',
            description: 'Total registered users across platform'
          },
          {
            id: 'revenue-growth',
            title: 'Revenue Growth',
            value: `$${(stats.companies.revenue / 1000).toFixed(0)}K`,
            change: { value: 32, type: 'increase', period: 'vs last quarter' },
            icon: <DollarSign size={20} />,
            color: '#f59e0b',
            description: 'Monthly recurring revenue'
          },
          {
            id: 'market-expansion',
            title: 'Market Expansion',
            value: stats.companies.total,
            change: { value: 18, type: 'increase', period: 'vs last quarter' },
            icon: <Building size={20} />,
            color: '#3b82f6',
            description: 'Companies using the platform'
          },
          {
            id: 'engagement-metrics',
            title: 'User Engagement',
            value: '89%',
            change: { value: 7, type: 'increase', period: 'vs last quarter' },
            icon: <Activity size={20} />,
            color: '#8b5cf6',
            description: 'Monthly active user rate'
          }
        ];

      default:
        return [];
    }
  };

  const widgets = getRoleBasedWidgets();

  const handleExportData = (widgetId: string) => {
    // Mock export functionality
    const widget = widgets.find(w => w.id === widgetId);
    if (widget) {
      const csvData = `Widget,Value,Change\n${widget.title},${widget.value},${widget.change?.value || 0}%`;
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${widget.id}-export.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getRoleDisplayName = (userType: UserType): string => {
    const roleNames = {
      super_admin: 'Super Admin',
      company_owner: 'Company Owner',
      company_it_admin: 'IT Admin',
      company_manager: 'Manager',
      investor: 'Investor'
    };
    return roleNames[userType] || 'User';
  };

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
    <div style={{
      padding: '0',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#111827',
              margin: 0
            }}>
              {getRoleDisplayName(currentUserType)} Dashboard
            </h1>
            <p style={{
              color: '#6b7280',
              margin: '4px 0 0 0',
              fontSize: '16px'
            }}>
              {currentUserType === 'super_admin' && 'Comprehensive platform overview and management'}
              {currentUserType === 'company_owner' && 'Company performance and team management'}
              {currentUserType === 'company_it_admin' && 'User management and system administration'}
              {currentUserType === 'company_manager' && 'Project monitoring and team performance'}
              {currentUserType === 'investor' && 'Platform growth and business metrics'}
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value as '7d' | '30d' | '90d')}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            
            <button
              onClick={() => {
                const allData = widgets.map(w => `${w.title},${w.value},${w.change?.value || 0}%`).join('\n');
                const csvData = `Widget,Value,Change\n${allData}`;
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `dashboard-export-${currentUserType}-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <Download size={16} />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Role-Based Analytics Widgets */}
      <div style={{
        padding: '0 24px',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {widgets.map((widget) => (
            <DashboardWidget
              key={widget.id}
              data={widget}
              size="medium"
              onExport={() => handleExportData(widget.id)}
              onEdit={() => {
                // Future: Open widget customization modal
                console.log('Edit widget:', widget.id);
              }}
            />
          ))}
        </div>
        
        {/* Quick Actions */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Settings size={20} />
            Quick Actions
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {currentUserType === 'super_admin' && (
              <>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}>
                  <Plus size={16} />
                  Add New Company
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  <Shield size={16} />
                  Manage Verifications
                </button>
              </>
            )}
            
            {(currentUserType === 'company_owner' || currentUserType === 'company_it_admin') && (
              <>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  <Users size={16} />
                  Add Team Member
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  <Briefcase size={16} />
                  Create Project
                </button>
              </>
            )}
            
            {currentUserType === 'company_manager' && (
              <>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  <TrendingUp size={16} />
                  View Reports
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  <HardHat size={16} />
                  Equipment Status
                </button>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
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

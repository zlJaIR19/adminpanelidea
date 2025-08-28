"use client";
import React from 'react';
import { mockSubscriptions, mockCompanies } from '@/data';
import { Subscription } from '@/types';

const BillingPage = () => {
  const getCompanyName = (companyId: string) => {
    const company = mockCompanies.find((c) => c.id === companyId);
    return company ? company.name : 'N/A';
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

  const statusBadgeStyle = (status: string) => {
    const colors = {
      active: { bg: '#dcfce7', text: '#166534' },
      past_due: { bg: '#fef3c7', text: '#92400e' },
      cancelled: { bg: '#fee2e2', text: '#991b1b' }
    };
    const color = colors[status as keyof typeof colors] || colors.cancelled;
    
    return {
      position: 'relative' as const,
      display: 'inline-block',
      padding: '4px 12px',
      fontWeight: '600',
      borderRadius: '9999px',
      fontSize: '12px',
      backgroundColor: color.bg,
      color: color.text,
      textTransform: 'capitalize' as const
    };
  };

  const planBadgeStyle = (plan: string) => {
    const colors = {
      'Basic': { bg: '#f3f4f6', text: '#374151' },
      'Pro': { bg: '#dbeafe', text: '#1e40af' },
      'Enterprise': { bg: '#ede9fe', text: '#7c3aed' }
    };
    const color = colors[plan as keyof typeof colors] || colors['Basic'];
    
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
        <h1 style={titleStyle}>Billing & Subscriptions</h1>
      </div>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Company</th>
              <th style={thStyle}>Plan</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Renewal Date</th>
            </tr>
          </thead>
          <tbody>
            {mockSubscriptions.map((sub: Subscription) => (
              <tr 
                key={sub.id}
                style={{ transition: 'background-color 0.15s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={tdStyle}>
                  <p style={{ color: '#111827', fontWeight: '500', margin: 0 }}>
                    {getCompanyName(sub.companyId)}
                  </p>
                </td>
                <td style={tdStyle}>
                  <span style={planBadgeStyle(sub.plan)}>
                    {sub.plan}
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(sub.status)}>
                    {sub.status.replace('_', ' ')}
                  </span>
                </td>
                <td style={tdStyle}>
                  <p style={{ color: '#111827', margin: 0 }}>
                    {new Date(sub.renewalDate).toLocaleDateString()}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingPage;

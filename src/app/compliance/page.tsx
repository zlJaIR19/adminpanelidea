"use client";
import React from 'react';
import { mockComplianceLogs } from '@/data';
import { ComplianceLog } from '@/types';

const CompliancePage = () => {
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

  const actionBadgeStyle = (action: string) => {
    const colors = {
      'User Created': { bg: '#dcfce7', text: '#166534' },
      'User Updated': { bg: '#dbeafe', text: '#1e40af' },
      'User Deleted': { bg: '#fee2e2', text: '#991b1b' },
      'Role Changed': { bg: '#fef3c7', text: '#92400e' },
      'Permission Modified': { bg: '#ede9fe', text: '#7c3aed' },
      'Login': { bg: '#f0fdf4', text: '#15803d' },
      'Logout': { bg: '#fef2f2', text: '#dc2626' }
    };
    const color = colors[action as keyof typeof colors] || { bg: '#f3f4f6', text: '#374151' };
    
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
        <h1 style={titleStyle}>Compliance & Audit Logs</h1>
      </div>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Action</th>
              <th style={thStyle}>Timestamp</th>
              <th style={thStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {mockComplianceLogs.map((log: ComplianceLog) => (
              <tr 
                key={log.id}
                style={{ transition: 'background-color 0.15s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={tdStyle}>
                  <p style={{ color: '#111827', fontWeight: '500', margin: 0 }}>{log.user}</p>
                </td>
                <td style={tdStyle}>
                  <span style={actionBadgeStyle(log.action)}>
                    {log.action}
                  </span>
                </td>
                <td style={tdStyle}>
                  <p style={{ color: '#111827', margin: 0 }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </td>
                <td style={tdStyle}>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '13px' }}>{log.details}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompliancePage;

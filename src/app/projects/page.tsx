"use client";
import React from 'react';
import { mockProjects, mockUsers } from '@/data';
import { Project } from '@/types';

const ProjectsPage = () => {
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

  const buttonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
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
      completed: { bg: '#dcfce7', text: '#166534' },
      in_progress: { bg: '#dbeafe', text: '#1e40af' },
      planning: { bg: '#fef3c7', text: '#92400e' }
    };
    const color = colors[status as keyof typeof colors] || colors.planning;
    
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
        <h1 style={titleStyle}>Project Management</h1>
        <button 
          style={buttonStyle}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          Create Project
        </button>
      </div>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Project Name</th>
              <th style={thStyle}>Manager</th>
              <th style={thStyle}>Deadline</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockProjects.map((project: Project) => (
              <tr 
                key={project.id}
                style={{ transition: 'background-color 0.15s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={tdStyle}>
                  <p style={{ color: '#111827', fontWeight: '500', margin: 0 }}>{project.name}</p>
                </td>
                <td style={tdStyle}>
                  <p style={{ color: '#111827', margin: 0 }}>{project.manager}</p>
                </td>
                <td style={tdStyle}>
                  <p style={{ color: '#111827', margin: 0 }}>
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(project.status)}>
                    {project.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsPage;

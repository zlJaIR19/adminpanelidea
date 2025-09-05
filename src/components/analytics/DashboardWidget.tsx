"use client";
import React from 'react';
import { TrendingUp, TrendingDown, Minus, MoreHorizontal, Download } from 'lucide-react';

export interface WidgetData {
  id: string;
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon?: React.ReactNode;
  color?: string;
  description?: string;
}

interface DashboardWidgetProps {
  data: WidgetData;
  size?: 'small' | 'medium' | 'large';
  onExport?: () => void;
  onEdit?: () => void;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ 
  data, 
  size = 'medium',
  onExport,
  onEdit 
}) => {
  const getChangeIcon = () => {
    if (!data.change) return null;
    
    switch (data.change.type) {
      case 'increase':
        return <TrendingUp size={16} color="#10b981" />;
      case 'decrease':
        return <TrendingDown size={16} color="#ef4444" />;
      case 'neutral':
        return <Minus size={16} color="#6b7280" />;
      default:
        return null;
    }
  };

  const getChangeColor = () => {
    if (!data.change) return '#6b7280';
    
    switch (data.change.type) {
      case 'increase':
        return '#10b981';
      case 'decrease':
        return '#ef4444';
      case 'neutral':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '16px',
          minHeight: '120px'
        };
      case 'large':
        return {
          padding: '24px',
          minHeight: '200px'
        };
      default:
        return {
          padding: '20px',
          minHeight: '160px'
        };
    }
  };

  const widgetStyle = {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    cursor: 'pointer',
    position: 'relative' as const,
    ...getSizeStyles()
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    margin: 0
  };

  const valueStyle = {
    fontSize: size === 'large' ? '32px' : size === 'small' ? '20px' : '28px',
    fontWeight: 'bold',
    color: data.color || '#111827',
    margin: '8px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const changeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: '500',
    color: getChangeColor()
  };

  const actionsStyle = {
    display: 'flex',
    gap: '4px',
    opacity: 0,
    transition: 'opacity 0.2s ease'
  };

  const actionButtonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280'
  };

  return (
    <div 
      style={widgetStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-1px)';
        const actions = e.currentTarget.querySelector('.widget-actions') as HTMLElement;
        if (actions) actions.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
        const actions = e.currentTarget.querySelector('.widget-actions') as HTMLElement;
        if (actions) actions.style.opacity = '0';
      }}
    >
      <div style={headerStyle}>
        <div>
          <h3 style={titleStyle}>{data.title}</h3>
          <div style={valueStyle}>
            {data.icon}
            {data.value}
          </div>
        </div>
        
        <div className="widget-actions" style={actionsStyle}>
          {onExport && (
            <button
              style={actionButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                onExport();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Download size={14} />
            </button>
          )}
          {onEdit && (
            <button
              style={actionButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <MoreHorizontal size={14} />
            </button>
          )}
        </div>
      </div>

      {data.change && (
        <div style={changeStyle}>
          {getChangeIcon()}
          <span>
            {data.change.value > 0 ? '+' : ''}{data.change.value}% {data.change.period}
          </span>
        </div>
      )}

      {data.description && (
        <div style={{
          fontSize: '12px',
          color: '#9ca3af',
          marginTop: '8px',
          lineHeight: '1.4'
        }}>
          {data.description}
        </div>
      )}
    </div>
  );
};

export default DashboardWidget;

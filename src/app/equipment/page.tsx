"use client";
import React, { useState } from 'react';
import { mockEquipment } from '@/data/equipment';
import { Equipment } from '@/types';
import { Search, Filter, Eye } from 'lucide-react';

const EquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEquipment, setFilteredEquipment] = useState(mockEquipment);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value === '') {
      setFilteredEquipment(mockEquipment);
    } else {
      const filtered = mockEquipment.filter(item =>
        item.model.toLowerCase().includes(value.toLowerCase()) ||
        item.brand.toLowerCase().includes(value.toLowerCase()) ||
        item.type.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEquipment(filtered);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Limited': { 
        backgroundColor: '#fef3c7', 
        color: '#92400e',
        border: '1px solid #f59e0b'
      },
      'OOS': { 
        backgroundColor: '#fee2e2', 
        color: '#991b1b',
        border: '1px solid #ef4444'
      },
      'In Stock': { 
        backgroundColor: '#dcfce7', 
        color: '#166534',
        border: '1px solid #22c55e'
      }
    };

    const style = statusStyles[status as keyof typeof statusStyles] || statusStyles['Limited'];
    
    return (
      <span style={{
        ...style,
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: style.color
        }}></span>
        {status}
      </span>
    );
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '600', 
          color: '#1f2937', 
          margin: '0 0 8px 0' 
        }}>
          Equipment
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0, 
          fontSize: '14px' 
        }}>
          Manage your HVAC equipment inventory
        </p>
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#9ca3af' 
            }} />
            <input
              type="text"
              placeholder="Items"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                paddingLeft: '40px',
                paddingRight: '12px',
                paddingTop: '8px',
                paddingBottom: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                width: '200px',
                outline: 'none'
              }}
            />
          </div>

          {/* Equipment Filters Button */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            backgroundColor: 'white',
            fontSize: '14px',
            color: '#374151',
            cursor: 'pointer'
          }}>
            <Filter size={16} />
            Equipment Filters
          </button>
        </div>

        {/* Add Equipment Button */}
        <button style={{
          backgroundColor: '#22c55e',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Add Equipment
        </button>
      </div>

      {/* Table */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
              </th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                MODEL
              </th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                BRAND
              </th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                TYPE
              </th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                STATUS
              </th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                YEAR
              </th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                PRICE
              </th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                REFRIGERANT
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipment.map((item: Equipment, index) => (
              <tr 
                key={item.id}
                style={{ 
                  borderBottom: index < filteredEquipment.length - 1 ? '1px solid #f3f4f6' : 'none',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={{ padding: '12px' }}>
                  <input type="checkbox" />
                </td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>
                  {item.model}
                </td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1f2937' }}>
                  {item.brand}
                </td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1f2937' }}>
                  {item.type}
                </td>
                <td style={{ padding: '12px' }}>
                  {getStatusBadge(item.status)}
                </td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1f2937' }}>
                  {item.year}
                </td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1f2937' }}>
                  {formatPrice(item.price)}
                </td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1f2937' }}>
                  {item.refrigerant}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    padding: '4px'
                  }}>
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentPage;

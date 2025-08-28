"use client";
import React from 'react';
import { mockUsers } from '@/data';
import { Award, MapPin, Star, ExternalLink, Mail, Phone, Globe } from 'lucide-react';

const PublicProfessionalsPage = () => {
  // Filter for verified professionals with public profiles
  const publicProfessionals = mockUsers.filter(user => 
    user.verifiedProfessional?.verificationStatus === 'verified' && 
    user.verifiedProfessional?.publicProfile
  );

  const ProfessionalCard = ({ user }: { user: any }) => {
    const professional = user.verifiedProfessional;
    
    const getAvailabilityColor = (availability: string) => {
      switch (availability) {
        case 'available': return { backgroundColor: '#dcfce7', color: '#166534' };
        case 'busy': return { backgroundColor: '#fef3c7', color: '#92400e' };
        case 'unavailable': return { backgroundColor: '#fee2e2', color: '#991b1b' };
        default: return { backgroundColor: '#f3f4f6', color: '#374151' };
      }
    };

    const getCategoryColor = (category: string) => {
      switch (category) {
        case 'licensed_contractor': return { backgroundColor: '#dbeafe', color: '#1e40af' };
        case 'industry_expert': return { backgroundColor: '#e9d5ff', color: '#7c3aed' };
        case 'engineer': return { backgroundColor: '#dcfce7', color: '#166534' };
        case 'technician': return { backgroundColor: '#fed7aa', color: '#c2410c' };
        default: return { backgroundColor: '#f3f4f6', color: '#374151' };
      }
    };

    const cardStyle = {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.2s ease',
      cursor: 'pointer'
    };

    const headerStyle = {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '16px'
    };

    const avatarStyle = {
      width: '48px',
      height: '48px',
      backgroundColor: '#dbeafe',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    const nameStyle = {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 8px 0'
    };

    const badgeStyle = (colors: any) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      ...colors
    });

    const detailsStyle = {
      marginBottom: '16px'
    };

    const specializationsStyle = {
      marginBottom: '16px'
    };

    const footerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '16px',
      borderTop: '1px solid #e5e7eb'
    };

    return (
      <div 
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }}
      >
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={avatarStyle}>
              <Award size={24} color="#1e40af" />
            </div>
            <div>
              <h3 style={nameStyle}>{user.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={badgeStyle(getCategoryColor(professional.professionalCategory))}>
                  <Award size={12} />
                  {professional.professionalCategory.replace('_', ' ')}
                </span>
                <span style={badgeStyle({ backgroundColor: '#dcfce7', color: '#166534' })}>
                  <Award size={12} />
                  Verified
                </span>
              </div>
            </div>
          </div>
          
          <span style={badgeStyle(getAvailabilityColor(professional.availability))}>
            {professional.availability}
          </span>
        </div>

        {/* Professional Details */}
        <div style={detailsStyle}>
          {professional.licenseNumber && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>License:</span>
              <span style={{ 
                fontSize: '14px', 
                fontFamily: 'monospace', 
                backgroundColor: '#f3f4f6', 
                padding: '4px 8px', 
                borderRadius: '4px' 
              }}>
                {professional.licenseNumber}
              </span>
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
            <MapPin size={16} color="#9ca3af" style={{ marginTop: '2px' }} />
            <div>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Service Areas:</span>
              <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>{professional.workRegion.join(', ')}</p>
            </div>
          </div>
          
          {professional.verificationDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Verified:</span>
              <span style={{ fontSize: '14px' }}>{new Date(professional.verificationDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Specializations */}
        <div style={specializationsStyle}>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Specializations:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {professional.specializations.map((spec: string, idx: number) => (
              <span 
                key={idx} 
                style={{ 
                  backgroundColor: '#eff6ff', 
                  color: '#1d4ed8', 
                  fontSize: '12px', 
                  padding: '4px 8px', 
                  borderRadius: '9999px' 
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Contact & Portfolio */}
        <div style={footerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {professional.contactEnabled && (
              <>
                <button style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  fontSize: '14px', 
                  color: '#2563eb', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer' 
                }}>
                  <Mail size={16} />
                  Contact
                </button>
                <button style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  fontSize: '14px', 
                  color: '#2563eb', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer' 
                }}>
                  <Phone size={16} />
                  Call
                </button>
              </>
            )}
            {professional.portfolio && (
              <a 
                href={professional.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  fontSize: '14px', 
                  color: '#2563eb', 
                  textDecoration: 'none' 
                }}
              >
                <Globe size={16} />
                Portfolio
                <ExternalLink size={12} />
              </a>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={16} color="#fbbf24" fill="#fbbf24" />
            <span style={{ fontSize: '14px', color: '#6b7280' }}>4.8 (24 reviews)</span>
          </div>
        </div>
      </div>
    );
  };

  const containerStyle = {
    padding: '24px 0'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    margin: 0
  };

  const filtersStyle = {
    display: 'flex',
    gap: '8px'
  };

  const selectStyle = {
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
  };

  const statCardStyle = (bgColor: string, borderColor: string) => ({
    backgroundColor: bgColor,
    border: `1px solid ${borderColor}`,
    padding: '20px',
    borderRadius: '12px'
  });

  const statHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  };

  const statValueStyle = (color: string) => ({
    fontSize: '28px',
    fontWeight: 'bold',
    color: color,
    margin: 0
  });

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  };

  const emptyStateStyle = {
    textAlign: 'center' as const,
    padding: '48px 0'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Verified Professionals</h1>
          <p style={subtitleStyle}>Browse certified HVAC professionals in your area</p>
        </div>
        <div style={filtersStyle}>
          <select style={selectStyle}>
            <option>All Categories</option>
            <option>Licensed Contractors</option>
            <option>Industry Experts</option>
            <option>Engineers</option>
            <option>Technicians</option>
          </select>
          <select style={selectStyle}>
            <option>All Regions</option>
            <option>Texas</option>
            <option>California</option>
            <option>Oklahoma</option>
            <option>Nevada</option>
          </select>
          <select style={selectStyle}>
            <option>All Availability</option>
            <option>Available</option>
            <option>Busy</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div style={statsGridStyle}>
        <div style={statCardStyle('#eff6ff', '#bfdbfe')}>
          <div style={statHeaderStyle}>
            <Award size={20} color="#2563eb" />
            <span style={{ fontWeight: '500', color: '#1e40af' }}>Total Professionals</span>
          </div>
          <p style={statValueStyle('#1e3a8a')}>{publicProfessionals.length}</p>
        </div>
        
        <div style={statCardStyle('#f0fdf4', '#bbf7d0')}>
          <div style={statHeaderStyle}>
            <Award size={20} color="#16a34a" />
            <span style={{ fontWeight: '500', color: '#166534' }}>Available Now</span>
          </div>
          <p style={statValueStyle('#14532d')}>
            {publicProfessionals.filter(u => u.verifiedProfessional?.availability === 'available').length}
          </p>
        </div>
        
        <div style={statCardStyle('#faf5ff', '#d8b4fe')}>
          <div style={statHeaderStyle}>
            <Award size={20} color="#9333ea" />
            <span style={{ fontWeight: '500', color: '#7c3aed' }}>Licensed Contractors</span>
          </div>
          <p style={statValueStyle('#581c87')}>
            {publicProfessionals.filter(u => u.verifiedProfessional?.professionalCategory === 'licensed_contractor').length}
          </p>
        </div>
        
        <div style={statCardStyle('#fff7ed', '#fed7aa')}>
          <div style={statHeaderStyle}>
            <Award size={20} color="#ea580c" />
            <span style={{ fontWeight: '500', color: '#c2410c' }}>Industry Experts</span>
          </div>
          <p style={statValueStyle('#9a3412')}>
            {publicProfessionals.filter(u => u.verifiedProfessional?.professionalCategory === 'industry_expert').length}
          </p>
        </div>
      </div>

      {/* Professionals Grid */}
      <div style={gridStyle}>
        {publicProfessionals.map((user) => (
          <ProfessionalCard key={user.id} user={user} />
        ))}
      </div>

      {/* Empty State */}
      {publicProfessionals.length === 0 && (
        <div style={emptyStateStyle}>
          <Award size={48} color="#9ca3af" style={{ margin: '0 auto 16px auto' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>No professionals found</h3>
          <p style={{ color: '#6b7280', margin: 0 }}>Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default PublicProfessionalsPage;

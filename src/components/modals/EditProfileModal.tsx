"use client";
import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, MapPin, Building, Shield } from 'lucide-react';
import { UserType, USER_TYPE_CONFIGS } from '@/types/auth';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserType: UserType;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  bio: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, currentUserType }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    location: '',
    department: '',
    bio: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    if (isOpen) {
      // Load current user profile from localStorage or API
      try {
        const authUser = localStorage.getItem('auth_user');
        if (authUser) {
          const user = JSON.parse(authUser);
          setProfile({
            name: user.name || 'Demo User',
            email: user.email || 'user@company.com',
            phone: user.phone || '+1 (555) 123-4567',
            location: user.location || 'San Francisco, CA',
            department: user.department || USER_TYPE_CONFIGS[currentUserType].description,
            bio: user.bio || `${USER_TYPE_CONFIGS[currentUserType].label} with expertise in platform management and operations.`
          });
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }
  }, [isOpen, currentUserType]);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserProfile> = {};

    if (!profile.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (profile.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(profile.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Invalid phone format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update localStorage
      const authUser = localStorage.getItem('auth_user');
      if (authUser) {
        const user = JSON.parse(authUser);
        const updatedUser = {
          ...user,
          ...profile,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      }

      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const inputGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px'
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${hasError ? '#ef4444' : '#d1d5db'}`,
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box' as const
  });

  const textareaStyle = (hasError: boolean) => ({
    ...inputStyle(hasError),
    minHeight: '80px',
    resize: 'vertical' as const
  });

  const errorStyle = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb'
  };

  const buttonStyle = (variant: 'primary' | 'secondary') => ({
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    ...(variant === 'primary' ? {
      backgroundColor: USER_TYPE_CONFIGS[currentUserType].color,
      color: 'white',
      border: 'none'
    } : {
      backgroundColor: 'white',
      color: '#6b7280',
      border: '1px solid #d1d5db'
    })
  });

  const userTypeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: `${USER_TYPE_CONFIGS[currentUserType].color}08`,
    border: `1px solid ${USER_TYPE_CONFIGS[currentUserType].color}`,
    borderRadius: '8px',
    marginBottom: '20px'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <User size={20} />
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User Type Display */}
        <div style={userTypeStyle}>
          <Shield size={16} color={USER_TYPE_CONFIGS[currentUserType].color} />
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px' }}>
              {USER_TYPE_CONFIGS[currentUserType].label}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              {USER_TYPE_CONFIGS[currentUserType].description}
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <User size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Full Name
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={inputStyle(!!errors.name)}
            placeholder="Enter your full name"
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Email Address
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={inputStyle(!!errors.email)}
            placeholder="Enter your email address"
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <Phone size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Phone Number
          </label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            style={inputStyle(!!errors.phone)}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Location
          </label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            style={inputStyle(!!errors.location)}
            placeholder="City, State/Country"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <Building size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Department
          </label>
          <input
            type="text"
            value={profile.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            style={inputStyle(!!errors.department)}
            placeholder="Your department or team"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            style={textareaStyle(!!errors.bio)}
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Action Buttons */}
        <div style={buttonGroupStyle}>
          <button
            onClick={onClose}
            style={buttonStyle('secondary')}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={buttonStyle('primary')}
            disabled={isLoading}
          >
            <Save size={16} />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

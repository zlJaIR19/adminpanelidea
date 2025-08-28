"use client";
import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, MapPin, Building, Shield, Award, Eye, Briefcase } from 'lucide-react';
import { User as UserType, ProfileType } from '@/types';
import { profileRoleMatrix } from '@/data';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onSave: (updatedUser: UserType) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    profileTypes: [] as ProfileType[],
    currentContext: 'basic' as ProfileType,
    companyName: '',
    role: '',
    verificationStatus: '',
    professionalCategory: '',
    licenseNumber: '',
    specializations: [] as string[],
    investorAccessLevel: '',
    shareholderVerified: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        status: user.status,
        profileTypes: user.profileTypes,
        currentContext: user.currentContext,
        companyName: user.companyMember?.companyName || '',
        role: user.companyMember?.role || '',
        verificationStatus: user.verifiedProfessional?.verificationStatus || '',
        professionalCategory: user.verifiedProfessional?.professionalCategory || '',
        licenseNumber: user.verifiedProfessional?.licenseNumber || '',
        specializations: user.verifiedProfessional?.specializations || [],
        investorAccessLevel: user.investor?.accessLevel || '',
        shareholderVerified: user.investor?.shareholderVerified || false
      });
    }
  }, [isOpen, user]);

  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Invalid phone format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm() || !user) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser: UserType = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        status: formData.status as 'active' | 'inactive' | 'suspended',
        profileTypes: formData.profileTypes,
        currentContext: formData.currentContext,
        companyMember: formData.companyName ? {
          companyId: user.companyMember?.companyId || 'company-1',
          companyName: formData.companyName,
          role: formData.role as any,
          joinDate: user.companyMember?.joinDate || new Date().toISOString(),
          assignedProjects: user.companyMember?.assignedProjects || [],
          status: 'active' as const,
          permissions: user.companyMember?.permissions || {
            view: true,
            edit: false,
            delete: false,
            manage_users: false,
            manage_projects: false
          }
        } : undefined,
        verifiedProfessional: formData.verificationStatus ? {
          verificationStatus: formData.verificationStatus as any,
          professionalCategory: formData.professionalCategory as any,
          licenseNumber: formData.licenseNumber || undefined,
          specializations: formData.specializations,
          verificationDate: user.verifiedProfessional?.verificationDate || new Date().toISOString(),
          workRegion: user.verifiedProfessional?.workRegion || [],
          availability: user.verifiedProfessional?.availability || 'available',
          publicProfile: user.verifiedProfessional?.publicProfile || false,
          contactEnabled: user.verifiedProfessional?.contactEnabled || false
        } : undefined,
        investor: formData.investorAccessLevel ? {
          accessLevel: formData.investorAccessLevel as any,
          shareholderVerified: formData.shareholderVerified,
          dashboardPreferences: user.investor?.dashboardPreferences || {
            defaultTimeRange: '30d',
            preferredMetrics: []
          }
        } : undefined,
        lastActivity: new Date().toISOString()
      };

      onSave(updatedUser);
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleProfileTypeToggle = (profileType: ProfileType) => {
    const newProfileTypes = formData.profileTypes.includes(profileType)
      ? formData.profileTypes.filter(type => type !== profileType)
      : [...formData.profileTypes, profileType];
    
    handleInputChange('profileTypes', newProfileTypes);
    
    // If removing current context, set to basic
    if (!newProfileTypes.includes(formData.currentContext)) {
      handleInputChange('currentContext', 'basic');
    }

    // Reset role if current role is not available for new profile types
    const availableRoles = getAvailableRoles(newProfileTypes);
    if (!availableRoles.includes(formData.role)) {
      handleInputChange('role', availableRoles[0] || '');
    }
  };

  const getAvailableRoles = (profileTypes: ProfileType[]): string[] => {
    const allRoles = new Set<string>();
    
    profileTypes.forEach(profileType => {
      const config = profileRoleMatrix[profileType];
      if (config) {
        config.availableRoles.forEach(role => allRoles.add(role));
      }
    });
    
    return Array.from(allRoles);
  };

  const handleSpecializationChange = (index: number, value: string) => {
    const newSpecs = [...formData.specializations];
    newSpecs[index] = value;
    handleInputChange('specializations', newSpecs);
  };

  const addSpecialization = () => {
    handleInputChange('specializations', [...formData.specializations, '']);
  };

  const removeSpecialization = (index: number) => {
    const newSpecs = formData.specializations.filter((_, i) => i !== index);
    handleInputChange('specializations', newSpecs);
  };

  if (!isOpen || !user) return null;

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
    maxWidth: '600px',
    maxHeight: '90vh',
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

  const selectStyle = (hasError: boolean) => ({
    ...inputStyle(hasError),
    backgroundColor: 'white'
  });

  const errorStyle = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px'
  };

  const checkboxGroupStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '12px',
    marginTop: '8px'
  };

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
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
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none'
    } : {
      backgroundColor: 'white',
      color: '#6b7280',
      border: '1px solid #d1d5db'
    })
  });

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <User size={20} />
            Edit User: {user.name}
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

        {/* Basic Information */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <User size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={inputStyle(!!errors.name)}
            placeholder="Enter full name"
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
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={inputStyle(!!errors.email)}
            placeholder="Enter email address"
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
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            style={inputStyle(!!errors.phone)}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            style={selectStyle(false)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Profile Types */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Profile Types</label>
          <div style={checkboxGroupStyle}>
            {(['basic', 'verified_professional', 'company_member', 'investor'] as ProfileType[]).map((type) => {
              const isChecked = formData.profileTypes.includes(type);
              const icons = {
                basic: <User size={16} />,
                verified_professional: <Award size={16} />,
                company_member: <Building size={16} />,
                investor: <Eye size={16} />
              };
              
              return (
                <label
                  key={type}
                  style={{
                    ...checkboxStyle,
                    backgroundColor: isChecked ? '#eff6ff' : 'white',
                    borderColor: isChecked ? '#3b82f6' : '#d1d5db'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleProfileTypeToggle(type)}
                    style={{ marginRight: '6px' }}
                  />
                  {icons[type]}
                  {type.replace('_', ' ')}
                </label>
              );
            })}
          </div>
        </div>

        {/* Current Context */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Current Context</label>
          <select
            value={formData.currentContext}
            onChange={(e) => handleInputChange('currentContext', e.target.value)}
            style={selectStyle(false)}
          >
            {formData.profileTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Role Selection */}
        {formData.profileTypes.length > 0 && (
          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <Shield size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              style={selectStyle(false)}
            >
              <option value="">Select role</option>
              {getAvailableRoles(formData.profileTypes).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              Available roles based on selected profile types
            </div>
          </div>
        )}

        {/* Company Information */}
        {formData.profileTypes.includes('company_member') && (
          <>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>
                <Building size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                style={inputStyle(false)}
                placeholder="Enter company name"
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>
                <Briefcase size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                style={selectStyle(false)}
              >
                <option value="">Select role</option>
                {getAvailableRoles(formData.profileTypes).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Professional Information */}
        {formData.profileTypes.includes('verified_professional') && (
          <>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>
                <Shield size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Verification Status
              </label>
              <select
                value={formData.verificationStatus}
                onChange={(e) => handleInputChange('verificationStatus', e.target.value)}
                style={selectStyle(false)}
              >
                <option value="">Select status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Professional Category</label>
              <select
                value={formData.professionalCategory}
                onChange={(e) => handleInputChange('professionalCategory', e.target.value)}
                style={selectStyle(false)}
              >
                <option value="">Select category</option>
                <option value="commercial_hvac">Commercial HVAC</option>
                <option value="energy_efficiency">Energy Efficiency</option>
                <option value="industrial_hvac">Industrial HVAC</option>
                <option value="system_design">System Design</option>
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>License Number</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                style={inputStyle(false)}
                placeholder="Enter license number"
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Specializations</label>
              {formData.specializations.map((spec, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => handleSpecializationChange(index, e.target.value)}
                    style={inputStyle(false)}
                    placeholder="Enter specialization"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecialization(index)}
                    style={{
                      padding: '8px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSpecialization}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Add Specialization
              </button>
            </div>
          </>
        )}

        {/* Investor Information */}
        {formData.profileTypes.includes('investor') && (
          <>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>
                <Eye size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Access Level
              </label>
              <select
                value={formData.investorAccessLevel}
                onChange={(e) => handleInputChange('investorAccessLevel', e.target.value)}
                style={selectStyle(false)}
              >
                <option value="">Select access level</option>
                <option value="basic">Basic</option>
                <option value="advanced">Advanced</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.shareholderVerified}
                  onChange={(e) => handleInputChange('shareholderVerified', e.target.checked)}
                />
                Shareholder Verified
              </label>
            </div>
          </>
        )}

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

export default EditUserModal;

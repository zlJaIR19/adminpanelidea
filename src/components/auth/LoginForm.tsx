"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Building, Users, BarChart3, Lock, Mail, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
}

interface LoginCredentials {
  email: string;
  password: string;
  userType: UserType;
  mfaCode?: string;
}

type UserType = 'super_admin' | 'company_owner' | 'company_manager' | 'company_it_admin' | 'investor';

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('company_owner');
  const [mfaCode, setMfaCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showMfaInput, setShowMfaInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const userTypeOptions = [
    {
      value: 'super_admin' as UserType,
      label: 'Super Admin',
      description: 'HVAC AI Staff - Full Platform Control',
      icon: Shield,
      color: '#dc2626',
      requiresMfa: true,
      emailDomain: '@hvacai.com'
    },
    {
      value: 'company_owner' as UserType,
      label: 'Company Owner',
      description: 'Permission Matrix Control',
      icon: Building,
      color: '#7c3aed',
      requiresMfa: true,
      emailDomain: null
    },
    {
      value: 'company_it_admin' as UserType,
      label: 'IT Admin',
      description: 'User Management & Settings',
      icon: Users,
      color: '#2563eb',
      requiresMfa: true,
      emailDomain: null
    },
    {
      value: 'company_manager' as UserType,
      label: 'Manager',
      description: 'Analytics & Monitoring',
      icon: BarChart3,
      color: '#059669',
      requiresMfa: false,
      emailDomain: null
    },
    {
      value: 'investor' as UserType,
      label: 'Investor',
      description: 'Platform Analytics & Growth Metrics',
      icon: Eye,
      color: '#7c2d12',
      requiresMfa: true,
      emailDomain: null
    }
  ];

  const selectedUserType = userTypeOptions.find(option => option.value === userType);

  const validateEmail = (email: string, userType: UserType): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    // Super Admin must use HVAC AI email domain
    if (userType === 'super_admin' && !email.endsWith('@hvacai.com')) {
      setError('Super Admin access requires @hvacai.com email domain');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate email format and domain
      if (!validateEmail(email, userType)) {
        setIsLoading(false);
        return;
      }

      // Check if MFA is required
      const requiresMfa = selectedUserType?.requiresMfa;
      
      if (requiresMfa && !showMfaInput) {
        // First step: validate credentials and request MFA
        setShowMfaInput(true);
        setIsLoading(false);
        return;
      }

      // Submit login with all required data
      await onLogin({
        email,
        password,
        userType,
        mfaCode: requiresMfa ? mfaCode : undefined
      });

    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
      setShowMfaInput(false);
      setMfaCode('');
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '40px',
    width: '100%',
    maxWidth: '480px'
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 8px 0'
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0
  };

  const userTypeGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '24px'
  };

  const userTypeCardStyle = (isSelected: boolean, color: string) => ({
    padding: '16px',
    border: `2px solid ${isSelected ? color : '#e5e7eb'}`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isSelected ? `${color}08` : 'white',
    textAlign: 'center' as const
  });

  const inputGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box' as const
  };

  const passwordContainerStyle = {
    position: 'relative' as const
  };

  const passwordToggleStyle = {
    position: 'absolute' as const,
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#6b7280'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: selectedUserType?.color || '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1,
    transition: 'all 0.2s ease'
  };

  const errorStyle = {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#991b1b'
  };

  const mfaInfoStyle = {
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#1e40af',
    fontSize: '14px'
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>HVAC AI Admin Panel</h1>
          <p style={subtitleStyle}>Secure access for authorized personnel</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* User Type Selection */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Access Level</label>
            <div style={userTypeGridStyle}>
              {userTypeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.value}
                    style={userTypeCardStyle(userType === option.value, option.color)}
                    onClick={() => {
                      setUserType(option.value);
                      setShowMfaInput(false);
                      setMfaCode('');
                      setError('');
                    }}
                  >
                    <Icon size={24} color={option.color} style={{ marginBottom: '8px' }} />
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                      {option.label}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      {option.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Email Input */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder={selectedUserType?.emailDomain ? `user${selectedUserType.emailDomain}` : 'your.email@company.com'}
              required
            />
          </div>

          {/* Password Input */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Password
            </label>
            <div style={passwordContainerStyle}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="Enter your password"
                required
              />
              <div
                style={passwordToggleStyle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          {/* MFA Input */}
          {showMfaInput && selectedUserType?.requiresMfa && (
            <>
              <div style={mfaInfoStyle}>
                <Shield size={16} />
                Multi-factor authentication required for {selectedUserType.label} access
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Authentication Code</label>
                <input
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  style={inputStyle}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
              </div>
            </>
          )}

          {/* Error Display */}
          {error && (
            <div style={errorStyle}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            style={buttonStyle}
            disabled={isLoading}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.opacity = '0.9';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.opacity = '1';
              }
            }}
          >
            {isLoading ? 'Authenticating...' : showMfaInput ? 'Verify & Sign In' : 'Sign In'}
          </button>
        </form>

        {/* Security Notice */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center' as const
        }}>
          <Shield size={16} style={{ display: 'inline', marginRight: '8px' }} />
          All access attempts are logged and monitored for security purposes
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

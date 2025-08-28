"use client";
import React from 'react';
import { Settings, User, Shield, Bell, Database, Globe, Lock, Mail } from 'lucide-react';

const SettingsPage = () => {
  // A real implementation would check the user's role
  const userRole = 'Super Admin'; // Hardcoded for demonstration

  const containerStyle = {
    padding: '0'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 24px 0'
  };

  const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  };

  const cardTitleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 16px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const sectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  };

  const settingItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #e5e7eb'
  };

  const settingLabelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#111827'
  };

  const settingDescStyle = {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '4px'
  };

  const toggleStyle = {
    width: '44px',
    height: '24px',
    backgroundColor: '#3b82f6',
    borderRadius: '12px',
    position: 'relative' as const,
    cursor: 'pointer',
    border: 'none'
  };

  const toggleInnerStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute' as const,
    top: '2px',
    right: '2px',
    transition: 'all 0.2s ease'
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    width: '200px'
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

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Settings</h1>

      {/* Profile Settings */}
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>
          <User size={24} color="#3b82f6" />
          My Profile
        </h2>
        <div>
          <div style={settingItemStyle}>
            <div>
              <div style={settingLabelStyle}>Full Name</div>
              <div style={settingDescStyle}>Your display name</div>
            </div>
            <input type="text" defaultValue="John Doe" style={inputStyle} />
          </div>
          <div style={settingItemStyle}>
            <div>
              <div style={settingLabelStyle}>Email Address</div>
              <div style={settingDescStyle}>Your contact email</div>
            </div>
            <input type="email" defaultValue="john.doe@hvacai.com" style={inputStyle} />
          </div>
          <div style={settingItemStyle}>
            <div>
              <div style={settingLabelStyle}>Phone Number</div>
              <div style={settingDescStyle}>Your contact phone</div>
            </div>
            <input type="tel" defaultValue="+1 (555) 123-4567" style={inputStyle} />
          </div>
          <div style={{ marginTop: '16px' }}>
            <button 
              style={buttonStyle}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>
          <Bell size={24} color="#3b82f6" />
          Notifications
        </h2>
        <div>
          <div style={settingItemStyle}>
            <div>
              <div style={settingLabelStyle}>Email Notifications</div>
              <div style={settingDescStyle}>Receive updates via email</div>
            </div>
            <button style={toggleStyle}>
              <div style={toggleInnerStyle}></div>
            </button>
          </div>
          <div style={settingItemStyle}>
            <div>
              <div style={settingLabelStyle}>Push Notifications</div>
              <div style={settingDescStyle}>Browser push notifications</div>
            </div>
            <button style={toggleStyle}>
              <div style={toggleInnerStyle}></div>
            </button>
          </div>
          <div style={settingItemStyle}>
            <div>
              <div style={settingLabelStyle}>Weekly Reports</div>
              <div style={settingDescStyle}>Weekly activity summaries</div>
            </div>
            <button style={toggleStyle}>
              <div style={toggleInnerStyle}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>
          <Lock size={24} color="#3b82f6" />
          Security
        </h2>
        <div>
          <div style={settingItemStyle}>
            <div>
              <div style={settingLabelStyle}>Two-Factor Authentication</div>
              <div style={settingDescStyle}>Add an extra layer of security</div>
            </div>
            <button 
              style={buttonStyle}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              Enable 2FA
            </button>
          </div>
          <div style={settingItemStyle}>
            <div>
              <div style={settingLabelStyle}>Change Password</div>
              <div style={settingDescStyle}>Update your account password</div>
            </div>
            <button 
              style={buttonStyle}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              Change Password
            </button>
          </div>
          <div style={settingItemStyle}>
            <div>
              <div style={settingLabelStyle}>Session Timeout</div>
              <div style={settingDescStyle}>Auto-logout after inactivity</div>
            </div>
            <select style={inputStyle}>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>8 hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Super Admin Settings */}
      {userRole === 'Super Admin' && (
        <>
          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>
              <Shield size={24} color="#7c3aed" />
              Platform Management
            </h2>
            <div>
              <div style={settingItemStyle}>
                <div>
                  <div style={settingLabelStyle}>User Registration</div>
                  <div style={settingDescStyle}>Allow new user registrations</div>
                </div>
                <button style={toggleStyle}>
                  <div style={toggleInnerStyle}></div>
                </button>
              </div>
              <div style={settingItemStyle}>
                <div>
                  <div style={settingLabelStyle}>Email Verification Required</div>
                  <div style={settingDescStyle}>Require email verification for new users</div>
                </div>
                <button style={toggleStyle}>
                  <div style={toggleInnerStyle}></div>
                </button>
              </div>
              <div style={settingItemStyle}>
                <div>
                  <div style={settingLabelStyle}>Maintenance Mode</div>
                  <div style={settingDescStyle}>Put platform in maintenance mode</div>
                </div>
                <button style={{ ...toggleStyle, backgroundColor: '#ef4444' }}>
                  <div style={{ ...toggleInnerStyle, right: '22px' }}></div>
                </button>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>
              <Database size={24} color="#7c3aed" />
              System Configuration
            </h2>
            <div>
              <div style={settingItemStyle}>
                <div>
                  <div style={settingLabelStyle}>API Rate Limiting</div>
                  <div style={settingDescStyle}>Requests per minute per user</div>
                </div>
                <input type="number" defaultValue="100" style={inputStyle} />
              </div>
              <div style={settingItemStyle}>
                <div>
                  <div style={settingLabelStyle}>File Upload Limit</div>
                  <div style={settingDescStyle}>Maximum file size (MB)</div>
                </div>
                <input type="number" defaultValue="10" style={inputStyle} />
              </div>
              <div style={settingItemStyle}>
                <div>
                  <div style={settingLabelStyle}>Session Duration</div>
                  <div style={settingDescStyle}>Default session timeout</div>
                </div>
                <select style={inputStyle}>
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>8 hours</option>
                  <option>24 hours</option>
                </select>
              </div>
              <div style={{ marginTop: '16px' }}>
                <button 
                  style={{ ...buttonStyle, backgroundColor: '#7c3aed' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
                >
                  Save System Settings
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsPage;

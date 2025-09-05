import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, UserCircle, Menu, Search, Settings, X, Eye, Edit } from 'lucide-react';
import { UserType, USER_TYPE_CONFIGS } from '@/types/auth';
import { Shield, Building, Users, BarChart3 } from 'lucide-react';
import EditProfileModal from '@/components/modals/EditProfileModal';
import GlobalSearch from '@/components/search/GlobalSearch';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  currentUserType?: UserType;
  onUserTypeChange?: (userType: UserType) => void;
}

const Header = ({ onToggleSidebar, isSidebarOpen, currentUserType = 'super_admin', onUserTypeChange }: HeaderProps) => {
  const [isUserTypeSwitcherOpen, setIsUserTypeSwitcherOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const router = useRouter();

  // Keyboard shortcut for global search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const userTypeIcons = {
    super_admin: Shield,
    company_owner: Building,
    company_it_admin: Users,
    company_manager: BarChart3,
    investor: Eye
  };

  const handleUserTypeChange = (userType: UserType) => {
    const mockUser = {
      id: '1',
      email: userType === 'super_admin' ? 'admin@hvacai.com' : 'user@company.com',
      name: 'Demo User',
      userType: userType,
      companyId: userType !== 'super_admin' ? 'company-1' : undefined,
      companyName: userType !== 'super_admin' ? 'Demo Company' : undefined,
      permissions: USER_TYPE_CONFIGS[userType].permissions,
      lastLogin: new Date().toISOString(),
      mfaEnabled: USER_TYPE_CONFIGS[userType].requiresMfa
    };

    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    if (onUserTypeChange) onUserTypeChange(userType);
    setIsUserTypeSwitcherOpen(false);
    window.location.reload();
  };
  const headerStyle = {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky' as const,
    top: 0,
    zIndex: 30
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px'
  };

  const leftSideStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const toggleButtonStyle = {
    padding: '8px',
    borderRadius: '8px',
    color: '#6b7280',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '8px 12px',
    minWidth: '300px'
  };

  const searchInputStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    color: '#374151',
    flex: 1,
    marginLeft: '8px'
  };

  const rightSideStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const notificationButtonStyle = {
    position: 'relative' as const,
    padding: '8px',
    borderRadius: '8px',
    color: '#6b7280',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  };

  const badgeStyle = {
    position: 'absolute' as const,
    top: '-4px',
    right: '-4px',
    height: '16px',
    width: '16px',
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '12px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const userProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingLeft: '16px',
    borderLeft: '1px solid #e5e7eb',
    position: 'relative' as const
  };

  const switcherToggleStyle = {
    marginLeft: '8px',
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s ease'
  };

  const editButtonStyle = {
    marginLeft: '4px',
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s ease'
  };

  const switcherPanelStyle = {
    position: 'absolute' as const,
    top: '100%',
    right: '0',
    marginTop: '8px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    minWidth: '200px',
    display: isUserTypeSwitcherOpen ? 'block' : 'none'
  };

  const switcherButtonStyle = (isActive: boolean, color: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    width: '100%',
    padding: '6px 8px',
    marginBottom: '4px',
    border: `1px solid ${isActive ? color : '#e5e7eb'}`,
    borderRadius: '4px',
    backgroundColor: isActive ? `${color}08` : 'white',
    color: isActive ? color : '#6b7280',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  });

  const userInfoStyle = {
    display: 'block'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={leftSideStyle}>
          <button 
            onClick={onToggleSidebar} 
            style={toggleButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            <Menu size={20} />
          </button>
          
          <button 
            onClick={() => setIsGlobalSearchOpen(true)}
            style={{
              ...searchContainerStyle,
              cursor: 'pointer',
              border: 'none',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
          >
            <Search size={16} color="#9ca3af" />
            <span style={{
              ...searchInputStyle,
              color: '#9ca3af'
            }}>
              Search users, companies, projects...
            </span>
            <span style={{
              fontSize: '12px',
              color: '#9ca3af',
              backgroundColor: '#e5e7eb',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '500'
            }}>
              ⌘K
            </span>
          </button>
        </div>
        
        <div style={rightSideStyle}>
          <button style={notificationButtonStyle}>
            <Bell size={20} />
            <span style={badgeStyle}>3</span>
          </button>
          
          <div style={userProfileStyle}>
            <div style={{ position: 'relative' }}>
              <UserCircle size={32} color="#9ca3af" />
              <span style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                height: '12px',
                width: '12px',
                backgroundColor: '#10b981',
                border: '2px solid white',
                borderRadius: '50%'
              }}></span>
            </div>
            <div style={userInfoStyle}>
              <p style={{ fontWeight: 600, color: '#111827', fontSize: '14px', margin: 0 }}>
                {USER_TYPE_CONFIGS[currentUserType].label}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                {USER_TYPE_CONFIGS[currentUserType].description}
              </p>
            </div>
            
            <button
              style={editButtonStyle}
              onClick={() => setIsEditProfileOpen(true)}
              title="Edit Profile"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <Edit size={14} />
            </button>
            
            <button
              style={switcherToggleStyle}
              onClick={() => setIsUserTypeSwitcherOpen(!isUserTypeSwitcherOpen)}
              title="Switch User Type (Demo)"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              {isUserTypeSwitcherOpen ? <X size={16} /> : <Settings size={16} />}
            </button>
            
            {/* User Type Switcher Panel */}
            <div style={switcherPanelStyle}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                🔄 Switch User Type
              </div>
              {(Object.keys(USER_TYPE_CONFIGS) as UserType[]).map((userType) => {
                const config = USER_TYPE_CONFIGS[userType];
                const Icon = userTypeIcons[userType];
                const isActive = currentUserType === userType;

                return (
                  <button
                    key={userType}
                    style={switcherButtonStyle(isActive, config.color)}
                    onClick={() => handleUserTypeChange(userType)}
                  >
                    <Icon size={14} />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '10px' }}>{config.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay to close switcher when clicking outside */}
      {isUserTypeSwitcherOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsUserTypeSwitcherOpen(false)}
        />
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentUserType={currentUserType}
      />

      {/* Global Search Modal */}
      <GlobalSearch 
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        onNavigate={(path) => {
          router.push(path);
          setIsGlobalSearchOpen(false);
        }}
      />
    </header>
  );
};

export default Header;

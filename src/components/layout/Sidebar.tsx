"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Users, Building, Settings, FileText, DollarSign, Shield, HardHat, Award, Eye } from 'lucide-react';
import { UserType } from '@/types/auth';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  userType?: UserType;
}

interface MenuItem {
  href: string;
  label: string;
  icon: any;
  allowedUserTypes: UserType[];
  isReadOnly?: boolean;
}

const Sidebar = ({ isOpen, onToggle, userType = 'company_owner' }: SidebarProps) => {
  const pathname = usePathname();
  
  const menuItems: MenuItem[] = [
    { 
      href: '/', 
      label: 'Home', 
      icon: Home, 
      allowedUserTypes: ['super_admin', 'company_owner', 'company_it_admin', 'company_manager'] 
    },
    { 
      href: '/users', 
      label: 'Users', 
      icon: Users, 
      allowedUserTypes: ['super_admin', 'company_owner', 'company_it_admin'] 
    },
    { 
      href: '/roles', 
      label: 'Roles & Permissions', 
      icon: Shield, 
      allowedUserTypes: ['super_admin', 'company_owner'] 
    },
    { 
      href: '/verification', 
      label: 'Verification', 
      icon: Award, 
      allowedUserTypes: ['super_admin', 'company_owner'] 
    },
    { 
      href: '/companies', 
      label: 'Companies', 
      icon: Building, 
      allowedUserTypes: ['super_admin', 'company_owner', 'company_it_admin', 'company_manager'],
      isReadOnly: userType === 'company_manager'
    },
    { 
      href: '/projects', 
      label: 'Projects', 
      icon: Briefcase, 
      allowedUserTypes: ['super_admin', 'company_owner', 'company_it_admin', 'company_manager'],
      isReadOnly: userType === 'company_manager'
    },
    { 
      href: '/equipment', 
      label: 'Equipment', 
      icon: HardHat, 
      allowedUserTypes: ['super_admin', 'company_owner', 'company_it_admin', 'company_manager'],
      isReadOnly: userType === 'company_manager'
    },
    { 
      href: '/compliance', 
      label: 'Compliance Logs', 
      icon: FileText, 
      allowedUserTypes: ['super_admin', 'company_owner', 'company_it_admin', 'company_manager'],
      isReadOnly: userType === 'company_manager' || userType === 'company_it_admin'
    },
    { 
      href: '/billing', 
      label: 'Billing & Subscriptions', 
      icon: DollarSign, 
      allowedUserTypes: ['super_admin'] 
    },
    { 
      href: '/investor', 
      label: 'Investor Dashboard', 
      icon: Eye, 
      allowedUserTypes: ['super_admin', 'investor'] 
    },
    { 
      href: '/settings', 
      label: 'Settings', 
      icon: Settings, 
      allowedUserTypes: ['super_admin', 'company_owner', 'company_it_admin'] 
    },
  ];

  // Filter menu items based on user type
  const filteredMenuItems = menuItems.filter(item => 
    item.allowedUserTypes.includes(userType)
  );

  const sidebarStyle = {
    width: isOpen ? '256px' : '0px',
    transition: 'width 0.3s ease',
    backgroundColor: '#1f2937',
    color: 'white',
    height: '100vh',
    overflow: 'hidden',
    padding: isOpen ? '16px' : '0px'
  };

  const headerStyle = {
    marginBottom: '32px',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  const navItemStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: isActive ? '#3b82f6' : 'transparent',
    transition: 'background-color 0.2s ease'
  });

  const iconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '12px'
  };

  return (
    <aside style={sidebarStyle}>
      {isOpen && (
        <>
          <div style={headerStyle}>
            <h1>HVAC AI Admin</h1>
          </div>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredMenuItems.map((item) => {
                const isActive = pathname === item.href;
                const linkStyle = {
                  ...navItemStyle(isActive),
                  opacity: item.isReadOnly ? 0.7 : 1
                };
                
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      style={linkStyle}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = '#374151';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <item.icon style={iconStyle} />
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.label}
                        {item.isReadOnly && (
                          <span style={{ 
                            fontSize: '10px', 
                            backgroundColor: '#6b7280', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px' 
                          }}>
                            VIEW
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </aside>
  );
};

export default Sidebar;

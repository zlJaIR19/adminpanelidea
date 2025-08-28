"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import { AuthUser, AuthState, LoginCredentials, UserType, USER_TYPE_CONFIGS } from '@/types/auth';

// Mock authentication service - replace with real API calls
class AuthService {
  private static instance: AuthService;
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation
    if (credentials.email === 'admin@hvacai.com' && credentials.password === 'admin123') {
      if (credentials.userType === 'super_admin' && !credentials.mfaCode) {
        throw new Error('MFA code required for Super Admin access');
      }
      
      const userTypeConfig = USER_TYPE_CONFIGS[credentials.userType];
      
      const user: AuthUser = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        userType: credentials.userType,
        companyId: credentials.userType !== 'super_admin' ? 'company-1' : undefined,
        companyName: credentials.userType !== 'super_admin' ? 'ACME HVAC Corp' : undefined,
        permissions: userTypeConfig.permissions,
        lastLogin: new Date().toISOString(),
        mfaEnabled: userTypeConfig.requiresMfa
      };

      // Store in localStorage (in production, use secure storage)
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_token', 'mock_jwt_token');
      
      return user;
    }

    throw new Error('Invalid credentials');
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }

  getCurrentUser(): AuthUser | null {
    try {
      const userStr = localStorage.getItem('auth_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  hasPermission(user: AuthUser | null, permission: string): boolean {
    if (!user) return false;
    if (user.permissions.includes('*')) return true; // Super admin
    return user.permissions.includes(permission);
  }

  getSessionTimeout(userType: UserType): number {
    return USER_TYPE_CONFIGS[userType].sessionTimeout * 60 * 1000; // Convert to milliseconds
  }
}

const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  const authService = AuthService.getInstance();

  useEffect(() => {
    // Check for existing session on mount
    const user = authService.getCurrentUser();
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null
    });

    // Set up session timeout
    if (user) {
      const timeout = authService.getSessionTimeout(user.userType);
      const timeoutId = setTimeout(() => {
        logout();
      }, timeout);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const user = await authService.login(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  const hasPermission = (permission: string): boolean => {
    return authService.hasPermission(authState.user, permission);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

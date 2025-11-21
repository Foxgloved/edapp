'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  aboutMe?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsUser: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@edapp.com',
    role: 'student',
    aboutMe: 'Passionate about continuous learning and professional development. Currently focusing on cybersecurity and compliance training.',
  },
  {
    id: '2',
    name: 'Security Experts',
    email: 'instructor@edapp.com',
    role: 'instructor',
    aboutMe: 'Cybersecurity and compliance training expert with 10+ years of experience.',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@edapp.com',
    role: 'admin',
    aboutMe: 'Platform administrator managing the educational system.',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication logic
    // In production, this would make an API call to your backend
    
    const foundUser = DEMO_USERS.find(u => u.email === email);
    
    if (foundUser) {
      // Demo passwords are: student123, instructor123, admin123
      const validPasswords = ['student123', 'instructor123', 'admin123'];
      if (validPasswords.includes(password)) {
        setUser(foundUser);
        router.push('/dashboard');
        return true;
      }
    }
    
    return false;
  };

  const loginAsUser = (demoUser: User) => {
    setUser(demoUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('demoUser');
    router.push('/login');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    loginAsUser,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper function to get user initials
export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
}

// Helper to get demo user by email
export function getDemoUser(email: string): User | undefined {
  return DEMO_USERS.find(u => u.email === email);
}


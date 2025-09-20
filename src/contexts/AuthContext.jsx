import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(undefined);

// Mock users for demo
let mockUsers = [
  {
    id: '1',
    email: 'doctor@medvault.com',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    avatar: null,
    phone: '+1-555-0123',
    address: '123 Medical Center Dr, Healthcare City',
    dateOfBirth: '1985-03-15',
    specialization: 'cardiology',
    licenseNumber: 'MD123456',
    createdAt: '2024-01-01'
  },
  {
    id: '2', 
    email: 'patient@medvault.com',
    name: 'John Smith',
    role: 'patient',
    avatar: null,
    phone: '+1-555-0456',
    address: '456 Health Ave, Wellness Town',
    dateOfBirth: '1990-07-22',
    bloodGroup: 'A+',
    emergencyContact: '+1-555-0789',
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    email: 'admin@medvault.com', 
    name: 'Admin User',
    role: 'admin',
    avatar: null,
    phone: '+1-555-0321',
    address: '789 Admin Blvd, System City',
    dateOfBirth: '1980-11-10',
    createdAt: '2024-01-01'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('medvault_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    console.log('Login attempt:', { email, password, role });
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check both mock users and registered users from localStorage
    const storedUsers = localStorage.getItem('medvault_users');
    const registeredUsers = storedUsers ? JSON.parse(storedUsers) : [];
    const allUsers = [...mockUsers, ...registeredUsers];
    
    console.log('Available users:', allUsers);
    
    const foundUser = allUsers.find(u => u.email === email && u.role === role);
    console.log('Found user:', foundUser);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('medvault_user', JSON.stringify(foundUser));
      console.log('User logged in successfully:', foundUser);
      setIsLoading(false);
      return true;
    }
    
    console.log('Login failed: User not found');
    setIsLoading(false);
    return false;
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user with unique ID
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      avatar: null,
      phone: userData.phone || '',
      address: userData.address || '',
      dateOfBirth: userData.dateOfBirth || '',
      createdAt: new Date().toISOString().split('T')[0],
      ...(userData.role === 'doctor' && {
        specialization: userData.specialization,
        licenseNumber: userData.licenseNumber
      }),
      ...(userData.role === 'patient' && {
        bloodGroup: userData.bloodGroup,
        emergencyContact: userData.emergencyContact
      })
    };
    
    // Add to mock users array
    mockUsers.push(newUser);
    
    // Store in localStorage for persistence
    const storedUsers = localStorage.getItem('medvault_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(newUser);
    localStorage.setItem('medvault_users', JSON.stringify(users));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medvault_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
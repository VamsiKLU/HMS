import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(undefined);

// Build API base URL: prefer env override, otherwise use same-origin via Nginx proxy
const getApiBaseUrl = () => {
  const envUrl = import.meta?.env?.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.replace(/\/$/, '');
  }
  // default to same-origin proxy path
  return '';
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if token exists and validate it
    const token = localStorage.getItem('token');
    if (token) {
      // Check if token is expired (basic check)
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        if (tokenPayload.exp && tokenPayload.exp < currentTime) {
          // Token is expired, remove it
          localStorage.removeItem('token');
          setIsLoading(false);
          return;
        }
      } catch (error) {
        // Invalid token format, remove it
        localStorage.removeItem('token');
        setIsLoading(false);
        return;
      }
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/auth/validate`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      // Network error or invalid token, clear it
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password, role) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return { success: true }; // Return success object with more details
      } else {
        let errorMessage = 'Invalid credentials. Please try again.';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // If response is not JSON, try to get text
          const errorText = await response.text();
          if (errorText) {
            errorMessage = errorText;
          }
        }
        console.error('Login failed:', errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (networkError) {
      console.error('Network error:', networkError);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const error = await response.text();
        return { success: false, error: error || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
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
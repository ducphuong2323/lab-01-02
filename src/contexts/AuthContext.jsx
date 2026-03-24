import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('orchid_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('orchid_user');
      }
    }
    setLoading(false);
  }, []);

  // Mock Google login
  const loginWithGoogle = async (email, name, photoUrl) => {
    const newUser = {
      email: email || 'user@example.com',
      name: name || 'Guest User',
      photoUrl: photoUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name || 'Guest User'),
      role: email === 'admin@orchidparadise.com' ? 'admin' : 'member',
      joinedDate: new Date().toISOString(),
      phone: '',
      address: '',
      bio: 'Orchid enthusiast'
    };
    
    setUser(newUser);
    localStorage.setItem('orchid_user', JSON.stringify(newUser));
    return newUser;
  };

  // Regular login
  const login = async (email, password) => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      const newUser = {
        email,
        name: email.split('@')[0],
        photoUrl: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(email.split('@')[0]),
        role: email === 'admin@orchidparadise.com' ? 'admin' : 'member',
        joinedDate: new Date().toISOString(),
        phone: '',
        address: '',
        bio: 'Orchid enthusiast'
      };
  
      setUser(newUser);
      localStorage.setItem('orchid_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('orchid_user');
  };

  // Update user profile
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('orchid_user', JSON.stringify(updatedUser));
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if user is logged in
  const isLoggedIn = () => {
    return !!user;
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
    updateProfile,
    isAdmin,
    isLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

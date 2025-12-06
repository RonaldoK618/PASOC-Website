const API_BASE_URL = 'http://localhost:5000/api';

// Simple fetch wrapper
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth endpoints
export const authAPI = {
  register: (userData) => 
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  login: (email, password) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  verifyToken: () => {
    const token = localStorage.getItem('token');
    if (!token) return Promise.resolve(null);
    
    return fetchAPI('/auth/verify', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },
};

// Members endpoints
export const membersAPI = {
  getProfile: () => {
    const token = localStorage.getItem('token');
    return fetchAPI('/members/profile', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },
  
  completeRegistration: (registrationData) => {
    const token = localStorage.getItem('token');
    return fetchAPI('/members/complete-registration', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(registrationData),
    });
  },
};

// Donations endpoints
export const donationsAPI = {
  create: (donationData) => {
    const token = localStorage.getItem('token');
    return fetchAPI('/donations/create', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(donationData),
    });
  },
  
  getHistory: () => {
    const token = localStorage.getItem('token');
    return fetchAPI('/donations/history', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },
  
  getStats: () => {
    const token = localStorage.getItem('token');
    return fetchAPI('/donations/stats', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },
};

// Health check
export const healthCheck = () => fetchAPI('/health');
// src/components/Login.tsx

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Define the interface for the form state
interface LoginFormState {
  username: string;
  password: string;
}

// Define the interface for form error messages
interface LoginFormErrors {
  username?: string;
  password?: string;
}

// Define the interface for user roles
interface User {
  username: string;
  password: string;
  role: string;
}

const Login: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({ username: '', password: '' });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const { theme, toggleTheme, setThemeColor } = useTheme();

  // Dummy users with roles
  const dummyUsers: User[] = [
    { username: 'John Doe', password: 'johndoe@123', role: 'Admin' },
    { username: 'Nick', password: 'Nick@123', role: 'User' },
    { username: 'guest', password: 'guest@123', role: 'Guest' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors: LoginFormErrors = {};
    if (!formState.username) newErrors.username = 'Username is required.';
    if (!formState.password) newErrors.password = 'Password is required.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const foundUser = dummyUsers.find(
      (user) => user.username === formState.username && user.password === formState.password
    );

    if (foundUser) {
      setIsSubmitted(true);
      setUserRole(foundUser.role);
    } else {
      setErrors({ username: 'Invalid username or password.', password: '' });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {isSubmitted && userRole && (
        <p>
          Welcome, {formState.username}! You are logged in as <strong>{userRole}</strong>.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="theme-toggle">
        <h3>Theme Settings</h3>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <div>
          <label htmlFor="themeColor">Select Theme Color:</label>
          <input
            type="color"
            id="themeColor"
            onChange={(e) => setThemeColor(e.target.value)}
            defaultValue="#ffffff"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

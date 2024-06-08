import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout(); // Check if logout function exists before calling it
        redirectToLogin();
      }
    } catch (error) {
      console.error('Failed to logout:', error); // Handle error gracefully
    }
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <header className="bg-blue-500 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold">Courverse</Link>
        <nav>
          <Link to="/" className="px-4">Home</Link>
          <Link to="/courses" className="px-4">Courses</Link>
          {currentUser ? (
            <>
              <Link to="/profile" className="px-4">Profile</Link>
              <button onClick={handleLogout} className="px-4">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-4">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

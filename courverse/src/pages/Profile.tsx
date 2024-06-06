import React from 'react';
import UserProfile from '../components/UserProfile';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">Profile</h1>
      {currentUser ? (
        <UserProfile />
      ) : (
        <p className="mt-4 text-red-600">You need to be logged in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;

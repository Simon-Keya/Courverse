import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth(); // Ensure useAuth is correctly imported
  const [name, setName] = useState(currentUser?.displayName || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      if (updateProfile) {
        await updateProfile(name); // Pass name directly to updateProfile
        // handle success, e.g., show a message or redirect
      }
    } catch {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold">User Profile</h2>
      {error && <div className="p-4 text-red-700 bg-red-100 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={currentUser?.email || ''}
            readOnly
            className="w-full px-3 py-2 mt-1 border rounded shadow-sm bg-gray-100 cursor-not-allowed"
          />
        </div>
        <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Update Profile
      </button>
    </form>
</div>
);
};

export default UserProfile;

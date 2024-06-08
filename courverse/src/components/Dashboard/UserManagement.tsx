import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  displayName?: string;
  email?: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>('/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleDelete = (userId: string) => {
    axios.delete(`/api/users/${userId}`).then(() => {
      setUsers(users.filter(user => user.id !== userId));
    });
  };

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id} className="p-4 bg-white border rounded shadow mb-4">
            <h3 className="text-xl font-bold">{user.displayName || user.email}</h3>
            <button 
              className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-700"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;

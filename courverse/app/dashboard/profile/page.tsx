"use client"
import axios from "axios";
import { useEffect, useState } from "react";

// Define the Profile type for TypeScript
interface Profile {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("/api/user/profile");
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/profile", profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center">Manage Profile</h1>
        <form onSubmit={handleUpdate} className="mt-10 max-w-lg mx-auto space-y-6">
          <div className="form-control">
            <label htmlFor="name" className="label">Name</label>
            <input
              id="name"
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="input input-bordered"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="input input-bordered"
              required
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

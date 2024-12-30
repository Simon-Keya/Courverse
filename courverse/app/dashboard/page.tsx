"use client"
import axios from "axios";
import { useEffect, useState } from "react";

// Define the type for the user data
interface UserData {
  name: string;
  completedCourses: number;
  certificates: number;
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null); // Use the defined type

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/user/dashboard");
        setUserData(response.data); // Assuming response.data has the correct structure
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
        {userData ? (
          <div className="mt-10">
            <h2 className="text-xl font-semibold">
              Welcome back, {userData.name}!
            </h2>
            <p>You have completed {userData.completedCourses} courses.</p>
            <p>Certificates earned: {userData.certificates}</p>
          </div>
        ) : (
          <div className="text-center mt-10">Loading...</div>
        )}
      </div>
    </div>
  );
}

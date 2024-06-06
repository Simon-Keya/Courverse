import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CourseCatalog from './pages/CourseCatalog';
import CoursePage from './pages/CoursePage';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './components/Dashboard/UserDashboard';
import AuthProvider from './contexts/AuthContext';

const App: React.FC = (): ReactElement => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CourseCatalog />} />
              <Route path="/course/:id" element={<CoursePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

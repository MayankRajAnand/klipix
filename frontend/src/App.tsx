import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/sonner';

import LandingPage from '@/routes/public/LandingPage';
import LoginPage from '@/routes/public/LoginPage';
import SignUpPage from '@/routes/public/SignUpPage';
import Dashboard from '@/routes/protected/Dashboard';
import FacelessShorts from '@/routes/protected/create/FacelessShorts';
import SeriesShorts from '@/routes/protected/create/SeriesShorts';
import Projects from '@/routes/protected/Projects';
import Analytics from '@/routes/protected/Analytics';
import SocialAccounts from '@/routes/protected/SocialAccounts';
import CreditsAndUsage from '@/routes/protected/CreditsAndUsage';
import Support from '@/routes/protected/Support';
import Profile from '@/routes/protected/Profile';
import Billing from '@/routes/protected/Billing';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/faceless"
            element={
              <ProtectedRoute>
                <FacelessShorts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/series"
            element={
              <ProtectedRoute>
                <SeriesShorts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/social-accounts"
            element={
              <ProtectedRoute>
                <SocialAccounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/credits-and-usage"
            element={
              <ProtectedRoute>
                <CreditsAndUsage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

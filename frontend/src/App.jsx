import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Search from './pages/Search';
import VenueDetail from './pages/VenueDetail';
import ReviewForm from './pages/ReviewForm';
import Profile from './pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Layout>
                  <Onboarding />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute requireProfile>
                <Layout>
                  <Search />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/venue/:placeId"
            element={
              <ProtectedRoute requireProfile>
                <Layout>
                  <VenueDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/venue/:placeId/review"
            element={
              <ProtectedRoute requireProfile>
                <Layout>
                  <ReviewForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

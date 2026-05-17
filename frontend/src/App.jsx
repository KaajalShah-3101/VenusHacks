import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CollageLayout from './components/collage/CollageLayout';
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
                <CollageLayout>
                  <Onboarding />
                </CollageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute requireProfile>
                <CollageLayout>
                  <Search />
                </CollageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/venue/:placeId"
            element={
              <ProtectedRoute requireProfile>
                <CollageLayout>
                  <VenueDetail />
                </CollageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/venue/:placeId/review"
            element={
              <ProtectedRoute requireProfile>
                <CollageLayout>
                  <ReviewForm />
                </CollageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <CollageLayout>
                  <Profile />
                </CollageLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

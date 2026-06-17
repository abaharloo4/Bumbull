import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useMockStore } from './store/mockStore';
import { Navbar } from './components/layout/Navbar';
import { LoginPage } from './routes/auth/LoginPage';
import { RegisterPage } from './routes/auth/RegisterPage';
import { SwipePage } from './routes/swipe/SwipePage';
import { DiscoveryPage } from './routes/discovery/DiscoveryPage';
import { MatchesPage } from './routes/matches/MatchesPage';
import { ChatPage } from './routes/chat/ChatPage';
import { ProfilePage } from './routes/profile/ProfilePage';
import { EditProfilePage } from './routes/profile/EditProfilePage';
import { SettingsPage } from './routes/settings/SettingsPage';

// Protected Route wrapper component
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useMockStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Layout component to wrap pages that require navigation sidebars/bars
const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg text-text selection:bg-primary selection:text-white">
      {/* Navigation bar (Sidebar on desktop, header + footer bar on mobile) */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-0 overflow-y-auto min-h-[calc(100vh-160px)] md:min-h-screen">
        <Routes>
          <Route path="swipe" element={<SwipePage />} />
          <Route path="discovery" element={<DiscoveryPage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="chat/:matchId" element={<ChatPage />} />
          <Route path="profile/:slug" element={<ProfilePage />} />
          <Route path="profile/me" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* Default redirect inside layout */}
          <Route path="*" element={<Navigate to="swipe" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  React.useEffect(() => {
    const getCookie = (name: string): string | null => {
      if (typeof document === 'undefined') return null;
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c && c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c && c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return null;
    };

    const loggedIn = getCookie('mock_logged_in') === 'true';
    if (loggedIn) {
      const userDataStr = getCookie('mock_user_data');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          useMockStore.getState().loginWithCookieData(userData);
        } catch (e) {
          console.error('Error parsing mock_user_data cookie:', e);
        }
      } else {
        const phoneNumber = getCookie('mock_phone_number') || '+989123456789';
        useMockStore.getState().login(phoneNumber);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private Routes (Protected via AuthGuard) */}
        <Route
          path="/*"
          element={
            <AuthGuard>
              <AppLayout />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

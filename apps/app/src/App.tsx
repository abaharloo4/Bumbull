import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useMockStore } from './store/mockStore';
import { Navbar } from './components/layout/Navbar';
import { LoginPage } from './routes/auth/LoginPage';
import { RegisterPage } from './routes/auth/RegisterPage';
import { PasswordResetPage } from './routes/auth/PasswordResetPage';
import { WaitForVerificationPage } from './routes/auth/WaitForVerificationPage';
import { SwipePage } from './routes/swipe/SwipePage';
import { MatchesPage } from './routes/matches/MatchesPage';
import { ChatsListPage } from './routes/matches/ChatsListPage';
import { ChatPage } from './routes/chat/ChatPage';
import { ProfilePage } from './routes/profile/ProfilePage';
import { EditProfilePage } from './routes/profile/EditProfilePage';
import { SettingsPage } from './routes/settings/SettingsPage';
import { EventsPage } from './routes/events/EventsPage';
import { EventDetailPage } from './routes/events/EventDetailPage';

// Protected Route wrapper component
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isCheckingAuth, currentUser } = useMockStore();
  const location = useLocation();

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center font-pixel text-white text-xs select-none">
        <div className="animate-pulse mb-2">LOADING SYSTEM...</div>
        <div className="text-accent">SYNCHRONIZING COORDINATES</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to wait-verification page if account is inactive/pending admin review
  if (currentUser && currentUser.is_active === false && location.pathname !== '/wait-verification') {
    return <Navigate to="/wait-verification" replace />;
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
          <Route path="matches" element={<MatchesPage />} />
          <Route path="chats" element={<ChatsListPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:eventId" element={<EventDetailPage />} />
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
  const checkAuth = useMockStore((state) => state.checkAuth);

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/wait-verification" element={<WaitForVerificationPage />} />

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

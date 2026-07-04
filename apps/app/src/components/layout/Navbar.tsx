import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, MessageSquare, User, Settings, LogOut, Calendar, Sparkles } from 'lucide-react';
import { useMockStore } from '../../store/mockStore';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentUser } = useMockStore();

  const navItems = [
    { path: '/swipe', label: 'Swipe', icon: <Heart size={20} /> },
    { path: '/matches', label: 'Matches', icon: <Sparkles size={20} /> },
    { path: '/chats', label: 'Chats', icon: <MessageSquare size={20} /> },
    { path: '/events', label: 'Events', icon: <Calendar size={20} /> },
    { path: `/profile/me`, label: 'Profile', icon: <User size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Desktop Navigation Sidebar (Left side, hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 border-r-4 border-black bg-surface min-h-screen p-6 justify-between select-none">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/swipe')}>
            <div className="w-10 h-10 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold text-lg shadow-pixel-sm">
              B
            </div>
            <span className="font-pixel text-lg text-white tracking-wider">BUMBULL</span>
          </div>

          {/* Current User Card */}
          {currentUser && (
            <div 
              className="border-2 border-black p-3 bg-bg flex items-center gap-3 cursor-pointer hover:bg-bg/80 active:translate-x-[2px] active:translate-y-[2px]"
              onClick={() => navigate(`/profile/${currentUser.slug || 'me'}`)}
            >
              <div className="w-10 h-10 border-2 border-black bg-secondary flex items-center justify-center text-xl overflow-hidden">
                {currentUser.photosList && currentUser.photosList.length > 0 ? (
                  <img src={currentUser.photosList[0].image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  currentUser.avatarEmoji || '🧔'
                )}
              </div>
              <div className="text-left overflow-hidden">
                <div className="font-pixel text-[10px] text-white truncate">{currentUser.first_name.toUpperCase()}</div>
                <div className="font-pixel text-[8px] text-accent mt-0.5">{currentUser.membership.toUpperCase()}</div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path === '/profile/me' && location.pathname.startsWith('/profile'));
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-4 w-full px-4 py-3 border-4 border-black font-pixel text-[10px] text-left transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-pixel-sm"
                      : "bg-surface text-text hover:bg-bg hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-muted"}>{item.icon}</span>
                  <span>{item.label.toUpperCase()}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-3 border-4 border-black bg-transparent text-[#f43f5e] font-pixel text-[10px] text-left hover:bg-red-500/10 active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
        >
          <LogOut size={20} />
          <span>LOGOUT</span>
        </button>
      </aside>

      {/* Mobile Top Header (Visible only on mobile) */}
      <header className="md:hidden border-b-4 border-black bg-surface px-6 py-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2" onClick={() => navigate('/swipe')}>
          <div className="w-8 h-8 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold text-sm">
            B
          </div>
          <span className="font-pixel text-sm text-white tracking-wider">BUMBULL</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-1 border-2 border-black bg-bg text-[#f43f5e] active:translate-x-[1px] active:translate-y-[1px]"
        >
          <LogOut size={16} />
        </button>
      </header>

      {/* Mobile Navigation Bottom Bar (Fixed at bottom, hidden on desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t-4 border-black bg-surface flex justify-around py-3 px-2 select-none shadow-[0_-4px_0_rgba(0,0,0,1)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === '/profile/me' && location.pathname.startsWith('/profile'));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 py-1 px-3 border-2 border-transparent transition-all active:scale-95 cursor-pointer ${
                isActive ? "text-primary font-bold" : "text-muted"
              }`}
            >
              <div className={isActive ? "scale-110" : ""}>{item.icon}</div>
              <span className="font-pixel text-[7px] tracking-tight">{item.label.toUpperCase()}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

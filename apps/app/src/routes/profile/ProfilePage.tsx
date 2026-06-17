import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockStore } from '../../store/mockStore';
import type { MockUser } from '../../store/mockStore';
import { PixelCard, PixelBadge, PixelProgressBar, PixelButton } from '../../components/ui/PixelComponents';
import { Edit, Copy, Heart, X, Star } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentUser, swipeQueue, swipeAction } = useMockStore();

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Determine if viewing own profile
  const isOwnProfile = slug === 'me' || slug === undefined || (currentUser && slug === currentUser.slug);

  // Get target user profile
  const user: MockUser | null = isOwnProfile
    ? currentUser
    : (swipeQueue.find(p => p.slug === slug || p.id.toString() === slug) as MockUser || null);

  const handleCopyCode = () => {
    if (!user?.invite_code) return;
    navigator.clipboard.writeText(user.invite_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwipe = (type: 'like' | 'pass' | 'super') => {
    if (!user) return;
    swipeAction(user.id, type);
    navigate('/swipe');
  };

  if (!user) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center p-6 text-center select-none font-mono">
        <span className="font-pixel text-xs text-muted mb-4">PROFILE COORDINATES ENCRYPTED</span>
        <PixelButton onClick={() => navigate('/swipe')} variant="primary">
          BACK TO APP
        </PixelButton>
      </div>
    );
  }

  // Calculate profile completeness for own profile
  const profileCompleteness = isOwnProfile ? 90 : 100;

  return (
    <div className="flex-1 p-6 text-left font-mono select-none max-w-2xl mx-auto">
      {/* Header back navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 border-2 border-black bg-surface hover:bg-bg text-white font-pixel text-[8px] active:translate-x-[1px] active:translate-y-[1px] flex items-center gap-1 cursor-pointer"
        >
          ◄ BACK
        </button>
        <span className="font-pixel text-[10px] text-muted">
          {isOwnProfile ? 'MY DATA CARD' : 'CHARACTER SPECTATE'}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {/* Photo Display Carousel */}
        <PixelCard hoverShadow={false} className="p-0 overflow-hidden relative border-4 border-black">
          <div className="h-80 bg-secondary relative flex items-center justify-center text-9xl select-none">
            {user.photosList && user.photosList.length > 0 ? (
              // If there are uploaded files or emojis
              <span className="animate-pulse">{user.photosList[activePhotoIdx]?.image_url}</span>
            ) : (
              <span>{user.avatarEmoji}</span>
            )}

            {/* Carousel controllers */}
            {user.photosList && user.photosList.length > 1 && (
              <>
                <button
                  onClick={() => setActivePhotoIdx(prev => (prev === 0 ? user.photosList.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border-4 border-black bg-surface flex items-center justify-center text-white font-bold cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                >
                  ◀
                </button>
                <button
                  onClick={() => setActivePhotoIdx(prev => (prev === user.photosList.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border-4 border-black bg-surface flex items-center justify-center text-white font-bold cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                >
                  ▶
                </button>
              </>
            )}

            {/* Photo indicators dot badges */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {user.photosList?.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 border-2 border-black ${idx === activePhotoIdx ? 'bg-primary' : 'bg-surface'}`}
                />
              ))}
            </div>

            {/* Rank badge */}
            <div className="absolute top-4 right-4">
              <PixelBadge tier={user.membership} />
            </div>
          </div>

          {/* Details header */}
          <div className="p-6 bg-surface border-t-4 border-black text-left">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="font-pixel text-xl text-white mb-2 truncate">
                  {user.full_name.toUpperCase()}
                </h1>
                <div className="font-pixel text-[10px] text-accent">
                  AGE: {user.age} | LIVES IN: {user.city_lives?.toUpperCase()}
                </div>
              </div>

              {isOwnProfile ? (
                <PixelButton
                  onClick={() => navigate('/profile/edit')}
                  variant="accent"
                  size="sm"
                  className="flex items-center gap-1 text-black"
                >
                  <Edit size={12} /> EDIT
                </PixelButton>
              ) : (
                <PixelBadge tier="verified" />
              )}
            </div>

            {/* Profile completeness for current user */}
            {isOwnProfile && (
              <div className="mb-6">
                <PixelProgressBar value={profileCompleteness} label="profile completion card" />
              </div>
            )}

            {/* Bio */}
            <div className="mb-6">
              <span className="font-pixel text-[9px] text-muted block mb-2">BIOGRAPHY</span>
              <p className="font-mono text-sm text-text leading-relaxed border-2 border-black bg-bg p-4">
                {user.biography}
              </p>
            </div>

            {/* Extra details grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border-2 border-black bg-bg p-3">
                <span className="font-pixel text-[7px] text-muted block mb-1">HEIGHT (STAT)</span>
                <span className="font-mono text-sm text-white">{user.height_cm || '175'} cm</span>
              </div>
              <div className="border-2 border-black bg-bg p-3">
                <span className="font-pixel text-[7px] text-muted block mb-1">ORIGIN CITY</span>
                <span className="font-mono text-sm text-white">{user.city_birth?.toUpperCase() || 'TEHRAN'}</span>
              </div>
            </div>

            {/* Fun Q&A */}
            {user.fun_answer && (
              <div className="mb-6 border-2 border-black bg-secondary/20 p-4">
                <span className="font-pixel text-[8px] text-accent block mb-2">QUESTION CARD: {user.fun_question?.toUpperCase()}</span>
                <p className="font-mono text-sm text-text italic">&quot;{user.fun_answer}&quot;</p>
              </div>
            )}

            {/* Interests tags */}
            <div className="mb-6">
              <span className="font-pixel text-[9px] text-muted block mb-2">INTEREST STATS</span>
              <div className="flex flex-wrap gap-2">
                {user.interestsList?.map((interest) => (
                  <span
                    key={interest.id}
                    className="font-pixel text-[8px] px-3 py-1.5 bg-bg border-2 border-black text-muted"
                  >
                    {interest.name.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Invite referral display for own profile */}
            {isOwnProfile && user.invite_code && (
              <div className="border-4 border-black bg-secondary p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-left">
                  <span className="font-pixel text-[9px] text-white block mb-1">INVITATION CODE</span>
                  <span className="font-mono text-xs text-accent">Share to upgrade to Silver tier</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    readOnly
                    value={user.invite_code}
                    className="bg-bg border-2 border-black text-center font-pixel text-xs py-2 px-4 flex-1 sm:flex-none text-white select-all focus:outline-none w-28"
                  />
                  <button
                    onClick={handleCopyCode}
                    className="p-2 border-2 border-black bg-accent text-black active:translate-x-[1px] active:translate-y-[1px] cursor-pointer shadow-pixel-sm text-xs font-pixel"
                  >
                    {copied ? 'OK!' : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </PixelCard>

        {/* Swipe control panel (Visible only on other user's profile screen) */}
        {!isOwnProfile && (
          <div className="flex justify-center items-center gap-6 mt-2">
            <PixelButton
              onClick={() => handleSwipe('pass')}
              variant="danger"
              className="w-16 h-16 !p-0 flex items-center justify-center"
            >
              <X size={24} />
            </PixelButton>
            <PixelButton
              onClick={() => handleSwipe('super')}
              variant="accent"
              className="w-14 h-14 !p-0 flex items-center justify-center"
            >
              <Star size={20} className="fill-current text-black" />
            </PixelButton>
            <PixelButton
              onClick={() => handleSwipe('like')}
              variant="success"
              className="w-16 h-16 !p-0 flex items-center justify-center"
            >
              <Heart size={24} className="fill-current" />
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
};

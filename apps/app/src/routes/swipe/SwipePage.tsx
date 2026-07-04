import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, Star, Sparkles, MessageSquare } from 'lucide-react';
import { useMockStore } from '../../store/mockStore';
import { PixelButton, PixelCard, PixelBadge } from '../../components/ui/PixelComponents';

export const SwipePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentSwipeProfile,
    swipeQueue,
    swipeQuota,
    swipeAction,
    currentUser
  } = useMockStore();

  // Match alert modal overlay state
  const [matchAlert, setMatchAlert] = useState<{
    isOpen: boolean;
    matchId?: number;
    partnerName: string;
    partnerEmoji: string;
  }>({
    isOpen: false,
    partnerName: '',
    partnerEmoji: ''
  });

  // Framer Motion motion values for drag gesture
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  
  // Swipe indicator opacity values
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleSwipe = async (direction: 'like' | 'pass' | 'super') => {
    if (!currentSwipeProfile) return;

    const profile = currentSwipeProfile;
    const result = await swipeAction(profile.id, direction);

    if (result.matchCreated) {
      setMatchAlert({
        isOpen: true,
        matchId: result.matchId,
        partnerName: profile.first_name,
        partnerEmoji: profile.avatarEmoji
      });
    }
  };

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      // Swipe Right
      handleSwipe('like');
    } else if (info.offset.x < -threshold) {
      // Swipe Left
      handleSwipe('pass');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 select-none relative font-mono min-h-[calc(100vh-160px)] md:min-h-screen">
      {/* Swipe Header / Quota */}
      <div className="flex justify-between items-center bg-surface border-4 border-black p-4 mb-6">
        <div className="text-left">
          <span className="font-pixel text-[8px] text-muted block mb-1">SWIPE QUOTA</span>
          <span className="font-pixel text-[10px] text-white">
            {swipeQuota.likes_limit - swipeQuota.likes_today} LIKES LEFT
          </span>
        </div>
        <div className="text-right">
          <span className="font-pixel text-[8px] text-muted block mb-1">SUPER LIKES</span>
          <span className="font-pixel text-[10px] text-accent">
            {swipeQuota.super_likes_limit - swipeQuota.super_likes_today} LEFT
          </span>
        </div>
      </div>

      {/* Main Card Arena */}
      <div className="flex-1 flex justify-center items-center relative min-h-[420px]">
        <AnimatePresence>
          {currentSwipeProfile ? (
            <div className="w-full max-w-sm h-[480px] relative">
              
              {/* Back card 2 (for stack effect) */}
              {swipeQueue.length > 2 && (
                <div 
                  className="absolute inset-0 bg-surface/40 border-4 border-black/40 translate-y-6 scale-90 z-0 pointer-events-none"
                />
              )}

              {/* Back card 1 (for stack effect) */}
              {swipeQueue.length > 1 && (
                <div 
                  className="absolute inset-0 bg-surface/70 border-4 border-black/70 translate-y-3 scale-95 z-10 pointer-events-none"
                />
              )}

              {/* Active Swipe Card */}
              <motion.div
                key={currentSwipeProfile.id}
                className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              >
                <PixelCard hoverShadow={false} className="w-full h-full p-0 overflow-hidden relative border-4 border-black flex flex-col">
                  {/* Photo Display Area */}
                  <div className="flex-1 bg-secondary relative flex items-center justify-center text-8xl overflow-hidden select-none">
                    {currentSwipeProfile.photosList && currentSwipeProfile.photosList.length > 0 ? (
                      <img src={currentSwipeProfile.photosList[0].image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="animate-pulse">{currentSwipeProfile.avatarEmoji}</span>
                    )}
                    
                    {/* Visual Overlay Indicator while dragging */}
                    <motion.div
                      style={{ opacity: likeOpacity }}
                      className="absolute top-6 left-6 border-4 border-success text-success font-pixel text-lg px-4 py-2 rotate-[-15deg] bg-bg/95 z-30"
                    >
                      LIKE
                    </motion.div>
                    <motion.div
                      style={{ opacity: nopeOpacity }}
                      className="absolute top-6 right-6 border-4 border-[#f43f5e] text-[#f43f5e] font-pixel text-lg px-4 py-2 rotate-[15deg] bg-bg/95 z-30"
                    >
                      PASS
                    </motion.div>
                  </div>

                  {/* Profile Metadata */}
                  <div className="p-5 bg-surface text-left border-t-4 border-black z-10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-pixel text-sm text-white mr-2">
                          {currentSwipeProfile.first_name.toUpperCase()}
                        </span>
                        <span className="font-pixel text-sm text-accent">
                          {currentSwipeProfile.age}
                        </span>
                      </div>
                      <PixelBadge tier={currentSwipeProfile.membership} />
                    </div>

                    <div className="font-pixel text-[8px] text-muted mb-3">
                      LIVES IN: {currentSwipeProfile.city_lives?.toUpperCase()}
                    </div>

                    <p className="font-mono text-xs text-text line-clamp-3 mb-4 leading-relaxed">
                      {currentSwipeProfile.biography}
                    </p>

                    {/* Interest Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {currentSwipeProfile.interestsList?.slice(0, 3).map((interest) => (
                        <span
                          key={interest.id}
                          className="font-pixel text-[6px] px-2 py-1 bg-bg border-2 border-black text-muted"
                        >
                          {interest.name.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </PixelCard>
              </motion.div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center max-w-sm text-center">
              <div className="w-24 h-24 bg-surface border-4 border-black flex items-center justify-center text-5xl mb-6 shadow-pixel">
                🛸
              </div>
              <h3 className="font-pixel text-sm text-white mb-3">OUT OF PROFILES</h3>
              <p className="font-mono text-sm text-muted mb-6">
                No more characters left in your coordinates. Check back later or expand your discovery filters!
              </p>
              <PixelButton onClick={() => navigate('/events')} variant="secondary" className="py-2.5">
                RETRO EVENTS
              </PixelButton>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Button Controls */}
      {currentSwipeProfile && (
        <div className="flex justify-center items-center gap-6 mt-8 z-30">
          <PixelButton
            onClick={() => handleSwipe('pass')}
            variant="danger"
            className="w-16 h-16 !p-0 flex items-center justify-center shadow-pixel hover:translate-y-[2px]"
          >
            <X size={24} />
          </PixelButton>
          <PixelButton
            onClick={() => handleSwipe('super')}
            variant="accent"
            className="w-14 h-14 !p-0 flex items-center justify-center shadow-pixel hover:translate-y-[2px]"
          >
            <Star size={20} className="fill-current text-black" />
          </PixelButton>
          <PixelButton
            onClick={() => handleSwipe('like')}
            variant="success"
            className="w-16 h-16 !p-0 flex items-center justify-center shadow-pixel hover:translate-y-[2px]"
          >
            <Heart size={24} className="fill-current" />
          </PixelButton>
        </div>
      )}

      {/* ======================================= */}
      {/* FULL-SCREEN MATCH ALERT OVERLAY         */}
      {/* ======================================= */}
      <AnimatePresence>
        {matchAlert.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center px-6"
          >
            {/* Pulsing retro visual effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute top-1/4 left-10 text-primary text-4xl animate-bounce">❤️</div>
              <div className="absolute top-1/3 right-10 text-primary text-4xl animate-pulse">❤️</div>
              <div className="absolute bottom-1/4 left-1/3 text-accent text-3xl">✨</div>
            </div>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="w-full max-w-md border-4 border-black bg-surface p-8 text-center shadow-pixel-accent relative"
            >
              <div className="w-16 h-16 bg-primary border-4 border-black flex items-center justify-center text-white mx-auto mb-6 shadow-pixel-sm">
                <Sparkles size={32} />
              </div>

              <h2 className="font-pixel text-2xl text-accent mb-6 animate-pulse">IT&apos;S A MATCH!</h2>

              {/* Matching Avatars Duo */}
              <div className="flex items-center justify-center gap-6 mb-8">
                {/* User Avatar */}
                <div className="w-20 h-20 border-4 border-black bg-secondary flex items-center justify-center text-4xl relative shadow-pixel-sm">
                  {currentUser?.avatarEmoji || '🧔'}
                  <div className="absolute -top-3 -left-3 bg-primary border-2 border-black text-white font-pixel text-[6px] px-1 py-0.5">YOU</div>
                </div>

                <div className="font-pixel text-xl text-primary animate-bounce">❤️</div>

                {/* Partner Avatar */}
                <div className="w-20 h-20 border-4 border-black bg-secondary flex items-center justify-center text-4xl relative shadow-pixel-sm">
                  {matchAlert.partnerEmoji}
                  <div className="absolute -top-3 -right-3 bg-accent border-2 border-black text-black font-pixel text-[6px] px-1 py-0.5">NEW</div>
                </div>
              </div>

              <p className="font-mono text-base text-text mb-8 leading-relaxed">
                You and <b>{matchAlert.partnerName}</b> have liked each other. The coordinates match!
              </p>

              <div className="flex flex-col gap-4">
                <PixelButton
                  onClick={() => {
                    setMatchAlert(prev => ({ ...prev, isOpen: false }));
                    if (matchAlert.matchId) navigate(`/chat/${matchAlert.matchId}`);
                  }}
                  variant="primary"
                  className="py-3 flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} /> SEND MESSAGE
                </PixelButton>

                <PixelButton
                  onClick={() => setMatchAlert(prev => ({ ...prev, isOpen: false }))}
                  variant="ghost"
                  className="py-2.5 text-xs text-muted hover:text-white"
                >
                  KEEP SWIPING
                </PixelButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

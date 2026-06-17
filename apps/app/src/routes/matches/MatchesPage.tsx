import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockStore } from '../../store/mockStore';
import { PixelCard, PixelAvatar, PixelButton } from '../../components/ui/PixelComponents';
import type { MockUser } from '../../store/mockStore';

export const MatchesPage: React.FC = () => {
  const navigate = useNavigate();
  const { matches, chatMessages } = useMockStore();

  return (
    <div className="flex-1 p-6 text-left font-mono select-none">
      <div className="mb-8">
        <h1 className="font-pixel text-lg text-white mb-2">MUTUAL MATCHES</h1>
        <p className="font-mono text-xs text-muted">Characters you have unlocked connections with</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {matches.map((match) => {
          const partner = match.user2 as MockUser;
          const messages = chatMessages[match.id] || [];
          const lastMsg = messages[messages.length - 1];

          return (
            <PixelCard
              key={match.id}
              onClick={() => navigate(`/chat/${match.id}`)}
              className="cursor-pointer hover:shadow-pixel-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-pixel-sm transition-all"
            >
              <div className="flex gap-4 items-center">
                {/* Avatar */}
                <PixelAvatar
                  src={undefined}
                  size="md"
                  verified={true}
                  tier={partner.membership}
                  alt={partner.first_name}
                />
                
                {/* Simulated Emojis as photo replacement inside avatar */}
                <div className="absolute left-[38px] top-[40px] text-3xl pointer-events-none select-none">
                  {partner.avatarEmoji}
                </div>

                {/* Match Metadata */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-pixel text-xs text-white truncate">
                      {partner.first_name.toUpperCase()}
                    </span>
                    <span className="font-mono text-[10px] text-muted">
                      {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'NEW MATCH'}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-muted truncate mb-2">
                    {lastMsg ? lastMsg.content : 'Unlock conversation...'}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="font-pixel text-[6px] px-2 py-1 bg-bg border-2 border-black text-accent">
                      {partner.city_lives?.toUpperCase()}
                    </span>
                    {!lastMsg && (
                      <span className="font-pixel text-[8px] bg-primary text-white border-2 border-black px-2 py-0.5 animate-pulse">
                        SAY HI!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </PixelCard>
          );
        })}

        {matches.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-surface border-4 border-black p-8 shadow-pixel">
            <div className="w-16 h-16 bg-bg border-4 border-black flex items-center justify-center text-3xl mb-6">
              💔
            </div>
            <h3 className="font-pixel text-xs text-white mb-2">NO ACTIVE MATCHES</h3>
            <p className="font-mono text-sm text-muted mb-6">
              Keep swiping and liking. Mutual interest unlocks active coordinates!
            </p>
            <PixelButton onClick={() => navigate('/swipe')} variant="primary" className="py-2.5">
              GO SWIPING
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
};

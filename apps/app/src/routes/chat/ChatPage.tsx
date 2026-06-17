import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockStore } from '../../store/mockStore';
import type { MockUser } from '../../store/mockStore';
import { PixelButton } from '../../components/ui/PixelComponents';
import { Send, ArrowLeft } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { matches, chatMessages, sendMessage, currentUser } = useMockStore();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMatch = matches.find(m => m.id === parseInt(matchId || '', 10));
  const partner = activeMatch ? (activeMatch.user2 as MockUser) : null;
  const activeMessages = activeMatch ? (chatMessages[activeMatch.id] || []) : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || !activeMatch) return;

    sendMessage(activeMatch.id, inputVal.trim());
    setInputVal('');
  };

  // Scroll to bottom whenever messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  if (!activeMatch || !partner) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center p-6 text-center select-none font-mono">
        <span className="font-pixel text-xs text-muted mb-4">CONVERSATION DATA NOT SECURED</span>
        <PixelButton onClick={() => navigate('/matches')} variant="primary">
          BACK TO MATCHES
        </PixelButton>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row border-4 border-black bg-surface min-h-[calc(100vh-160px)] md:min-h-screen font-mono select-none">
      {/* Sidebar List (Desktop Only, Collapsible on Mobile) */}
      <div className="hidden md:flex flex-col w-80 border-r-4 border-black bg-surface select-none">
        <div className="p-4 border-b-4 border-black font-pixel text-[10px] text-white flex items-center justify-between">
          <span>ACTIVE SIGNALS</span>
          <span className="bg-primary text-white border-2 border-black px-1.5 py-0.5">{matches.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y-2 divide-black">
          {matches.map((match) => {
            const listPartner = match.user2 as MockUser;
            const msgs = chatMessages[match.id] || [];
            const lastM = msgs[msgs.length - 1];
            const isActive = match.id === activeMatch.id;

            return (
              <div
                key={match.id}
                onClick={() => navigate(`/chat/${match.id}`)}
                className={`p-4 text-left cursor-pointer flex gap-3 items-center transition-all ${
                  isActive ? 'bg-primary/20 border-l-8 border-primary' : 'bg-surface hover:bg-bg'
                }`}
              >
                <div className="w-10 h-10 border-2 border-black bg-secondary flex items-center justify-center text-2xl relative shrink-0">
                  {listPartner.avatarEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-pixel text-[8px] text-white truncate">{listPartner.first_name.toUpperCase()}</span>
                    <span className="text-[9px] text-muted">
                      {lastM ? new Date(lastM.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted truncate">{lastM ? lastM.content : 'Unlock conversation...'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Messaging Chat Area */}
      <div className="flex-1 flex flex-col bg-bg">
        {/* Chat Header */}
        <div className="border-b-4 border-black bg-surface p-4 flex items-center justify-between shadow-pixel-sm z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/matches')}
              className="md:hidden p-1.5 border-2 border-black bg-bg text-white active:translate-x-[1px] active:translate-y-[1px]"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="w-10 h-10 border-2 border-black bg-secondary flex items-center justify-center text-2xl">
              {partner.avatarEmoji}
            </div>
            <div className="text-left">
              <span className="font-pixel text-xs text-white block mb-0.5">
                {partner.first_name.toUpperCase()}
              </span>
              <span className="font-pixel text-[6px] text-success animate-pulse block">
                ● ONLINE
              </span>
            </div>
          </div>
          
          <button
            onClick={() => navigate(`/profile/${partner.slug || partner.id}`)}
            className="px-3 py-1.5 border-2 border-black bg-bg hover:bg-surface text-accent font-pixel text-[8px] active:translate-x-[1px] active:translate-y-[1px]"
          >
            VIEW PROFILE
          </button>
        </div>

        {/* Message Thread Panel */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 max-h-[calc(100vh-280px)] md:max-h-[calc(100vh-140px)]">
          {activeMessages.map((msg) => {
            const isMe = msg.sender_id === currentUser?.id;
            return (
              <div
                key={msg.id}
                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-3 border-2 border-black shadow-pixel-sm text-left ${
                    isMe
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text'
                  }`}
                >
                  <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                  <div
                    className={`text-[8px] mt-1.5 text-right font-mono ${
                      isMe ? 'text-white/70' : 'text-muted'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Scroll Target */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input form bar */}
        <form onSubmit={handleSend} className="border-t-4 border-black bg-surface p-4 flex gap-3">
          <input
            type="text"
            placeholder="Type your signal message..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 border-4 border-black bg-bg p-3 font-mono text-sm text-text focus:outline-none focus:border-primary placeholder:text-muted/50"
          />
          <PixelButton type="submit" variant="primary" className="!px-4 !py-3">
            <Send size={16} />
          </PixelButton>
        </form>
      </div>
    </div>
  );
};

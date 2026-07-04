import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockStore } from '../../store/mockStore';
import { PixelCard, PixelButton } from '../../components/ui/PixelComponents';
import { ArrowLeft, Calendar, MapPin, Users, Send, AlertTriangle } from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const idNum = parseInt(eventId || '', 10);

  const {
    activeEvent,
    activeEventMessages,
    eventTypingStatus,
    fetchEventDetail,
    joinEvent,
    leaveEvent,
    sendEventMessage,
    connectEventWebSocket,
    disconnectEventWebSocket,
    sendEventTyping,
    currentUser,
  } = useMockStore();

  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load event details and manage WebSocket connection
  useEffect(() => {
    if (!idNum) return;

    const loadDetail = async () => {
      setLoading(true);
      await fetchEventDetail(idNum);
      setLoading(false);
    };
    loadDetail();
  }, [idNum, fetchEventDetail]);

  // Connect WebSocket only if the user is joined (attending or waitlisted)
  useEffect(() => {
    if (!idNum || !activeEvent || (!activeEvent.is_joined && !activeEvent.is_waitlisted)) {
      disconnectEventWebSocket();
      return;
    }

    connectEventWebSocket(idNum);

    return () => {
      disconnectEventWebSocket();
    };
  }, [idNum, activeEvent?.is_joined, activeEvent?.is_waitlisted, connectEventWebSocket, disconnectEventWebSocket]);

  // Scroll event chat to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeEventMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || !idNum) return;

    sendEventMessage(idNum, inputVal.trim());
    setInputVal('');
    // Stop typing indicator
    sendEventTyping(idNum, false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    if (!idNum) return;
    
    if (e.target.value.trim().length > 0) {
      sendEventTyping(idNum, true);
    } else {
      sendEventTyping(idNum, false);
    }
  };

  const handleJoin = async () => {
    if (!idNum) return;
    setLoading(true);
    await joinEvent(idNum);
    setLoading(false);
  };

  const handleLeave = async () => {
    if (!idNum) return;
    if (window.confirm('Are you sure you want to cancel your RSVP / waitlist spot?')) {
      setLoading(true);
      await leaveEvent(idNum);
      setLoading(false);
    }
  };

  if (loading && !activeEvent) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center p-6 text-center select-none font-mono min-h-screen">
        <span className="font-pixel text-xs text-accent animate-pulse">CONNECTING TO SECURE TERMINAL...</span>
      </div>
    );
  }

  if (!activeEvent) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center p-6 text-center select-none font-mono min-h-screen">
        <span className="font-pixel text-xs text-danger mb-4">ACCESS DENIED: EVENT RECORD NOT FOUND</span>
        <PixelButton onClick={() => navigate('/events')} variant="primary">
          BACK TO SECTOR MAP
        </PixelButton>
      </div>
    );
  }

  const isRSVPed = activeEvent.is_joined || activeEvent.is_waitlisted;
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Get active typers (excluding current user)
  const typingUsers = eventTypingStatus[idNum] || {};
  const typersList = Object.entries(typingUsers)
    .filter(([name, isTyping]) => isTyping && name !== (currentUser?.full_name || currentUser?.first_name))
    .map(([name]) => name.toUpperCase());

  return (
    <div className="p-6 font-mono select-none text-left">
      {/* Back to Events */}
      <button
        onClick={() => navigate('/events')}
        className="flex items-center gap-2 mb-6 px-3 py-1.5 border-2 border-black bg-surface text-xs text-text active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span>BACK TO EVENTS</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Description & Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Main Card */}
          <PixelCard shadowVariant={isRSVPed ? 'primary' : 'default'} className="p-6">
            <div className="flex justify-between items-start gap-4 mb-4">
              <span className="font-pixel text-[8px] text-accent bg-black px-2 py-1">
                {activeEvent.city.toUpperCase()}
              </span>
              <span className="font-pixel text-[8px] text-primary">
                STARTS: {activeEvent.starts_in.toUpperCase()}
              </span>
            </div>

            <h1 className="font-pixel text-lg text-white mb-4">{activeEvent.title.toUpperCase()}</h1>
            <p className="text-sm text-text leading-relaxed whitespace-pre-wrap mb-6 border-b-2 border-black pb-6">
              {activeEvent.description}
            </p>

            {/* Event Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text mb-6">
              <div className="border-2 border-black p-3 bg-surface flex flex-col gap-1">
                <span className="font-pixel text-[7px] text-muted">DATE & TIME</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Calendar size={14} className="text-primary shrink-0" />
                  <span>{formatDate(activeEvent.date_time)}</span>
                </div>
              </div>

              <div className="border-2 border-black p-3 bg-surface flex flex-col gap-1">
                <span className="font-pixel text-[7px] text-muted">SECTOR AREA</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span>{activeEvent.area_label}</span>
                </div>
              </div>

              <div className="border-2 border-black p-3 bg-surface flex flex-col gap-1">
                <span className="font-pixel text-[7px] text-muted">PARTICIPANTS</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Users size={14} className="text-primary shrink-0" />
                  <span>{activeEvent.current_participants} / {activeEvent.capacity} ATTENDING</span>
                </div>
              </div>
            </div>

            {/* Join / Leave Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/10 p-4 border-2 border-black">
              <div className="text-left w-full md:w-auto">
                <span className="font-pixel text-[8px] text-white block mb-1">REGISTRATION CONTROLS</span>
                <span className="text-[11px] text-muted">
                  {activeEvent.is_joined
                    ? 'Your character code is secure in the attendance list.'
                    : activeEvent.is_waitlisted
                    ? 'Waitlisted. You will be auto-promoted once capacity frees up.'
                    : activeEvent.is_full
                    ? 'This event is full. You can join the backup waitlist queue.'
                    : 'RSVP is open. Reserve your local signal pass.'}
                </span>
              </div>

              {isRSVPed ? (
                <PixelButton onClick={handleLeave} variant="danger" size="md" className="shrink-0 w-full md:w-auto">
                  CANCEL RSVP / LEAVE
                </PixelButton>
              ) : activeEvent.join_is_open ? (
                <PixelButton onClick={handleJoin} variant="primary" size="md" className="shrink-0 w-full md:w-auto">
                  {activeEvent.is_full ? 'JOIN WAITLIST QUEUE' : 'RSVP (ATTEND)'}
                </PixelButton>
              ) : (
                <span className="font-pixel text-[8px] text-danger border-2 border-danger px-3 py-2 shrink-0">
                  REGISTRATION CLOSED
                </span>
              )}
            </div>
          </PixelCard>

          {/* Secure/Unlocked Private Section */}
          {isRSVPed ? (
            <PixelCard shadowVariant="primary" className="p-6">
              <h2 className="font-pixel text-xs text-accent mb-4">🔐 DECRYPTED SECTOR DETAILS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-left">
                <div className="flex flex-col gap-2">
                  <span className="font-pixel text-[8px] text-muted">LOCATION ADDRESS</span>
                  <div className="border-2 border-black bg-surface p-3 text-white font-mono leading-relaxed">
                    {activeEvent.full_address || 'Address decryption pending...'}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-pixel text-[8px] text-muted">GUIDELINES & MAP DATA</span>
                  <div className="border-2 border-black bg-surface p-3 text-text font-mono leading-normal">
                    {activeEvent.location_details || 'Stay alert. Do not share coordinate details outside Bumbull Network.'}
                  </div>
                </div>
              </div>
            </PixelCard>
          ) : (
            <div className="border-4 border-black border-dashed bg-surface/20 p-8 text-center flex flex-col justify-center items-center gap-3">
              <AlertTriangle size={32} className="text-accent" />
              <span className="font-pixel text-[10px] text-accent">COORDINATE DETAILS ENCRYPTED</span>
              <p className="text-xs text-muted max-w-md">
                Full address, entry guidelines, and meeting point coordinates will be decrypted and displayed here upon RSVP confirmation.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Participant list & Chat Room */}
        <div className="flex flex-col gap-6">
          {/* Participant Panel */}
          {isRSVPed && activeEvent.participants && (
            <PixelCard shadowVariant="default" className="p-4 flex flex-col max-h-[300px]">
              <span className="font-pixel text-[8px] text-white block mb-3 border-b-2 border-black pb-2">
                ACTIVE SIGNALS ({activeEvent.participants.length})
              </span>
              <div className="overflow-y-auto flex-1 flex flex-col gap-2 pr-1">
                {activeEvent.participants.map((participant) => (
                  <div key={participant.id} className="border-2 border-black bg-surface p-2 flex items-center justify-between text-xs">
                    <span className="truncate text-white font-pixel text-[8px]">
                      {participant.user.full_name.toUpperCase()}
                    </span>
                    <span className={`px-1 text-[8px] border-1 border-black shrink-0 ${
                      participant.status === 'attending' ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'
                    }`}>
                      {participant.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </PixelCard>
          )}

          {/* Event Chat Box */}
          {isRSVPed ? (
            <PixelCard shadowVariant="accent" className="p-4 flex flex-col h-[400px]">
              <span className="font-pixel text-[8px] text-white block mb-3 border-b-2 border-black pb-2">
                SECTOR SIGNAL CHAT
              </span>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-1 mb-3 pr-2 text-xs">
                {activeEventMessages.length === 0 ? (
                  <div className="flex-1 flex justify-center items-center text-center text-muted">
                    <span>Chat terminal active. Say hello to the sector players!</span>
                  </div>
                ) : (
                  activeEventMessages.map((msg) => {
                    const isMe = msg.sender.id === currentUser?.id;
                    return (
                      <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <span className="font-pixel text-[6px] text-muted mb-0.5">
                          {isMe ? 'YOU' : msg.sender.full_name.toUpperCase()}
                        </span>
                        <div className={`p-2 border-2 border-black shadow-pixel-sm max-w-[85%] text-left ${
                          isMe ? 'bg-primary text-white' : 'bg-surface text-text'
                        }`}>
                          <p className="font-mono break-all whitespace-pre-wrap">{msg.content}</p>
                          <div className={`text-[6px] text-right mt-1 ${isMe ? 'text-white/70' : 'text-muted'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Typing indicators */}
              {typersList.length > 0 && (
                <div className="text-[8px] text-accent font-pixel mb-1 animate-pulse text-left">
                  {typersList.join(', ')} {typersList.length > 1 ? 'ARE' : 'IS'} TYPING SIGNAL...
                </div>
              )}

              {/* Chat Input */}
              <form onSubmit={handleSend} className="border-t-2 border-black pt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Transmit signal message..."
                  value={inputVal}
                  onChange={handleInputChange}
                  className="flex-1 border-2 border-black bg-bg p-2 text-xs font-mono text-text focus:outline-none focus:border-accent placeholder:text-muted/50"
                />
                <PixelButton type="submit" variant="accent" className="!px-3 !py-2 shrink-0">
                  <Send size={12} />
                </PixelButton>
              </form>
            </PixelCard>
          ) : (
            <div className="border-4 border-black border-dashed bg-surface/20 p-8 text-center flex flex-col justify-center items-center gap-3">
              <AlertTriangle size={32} className="text-muted" />
              <span className="font-pixel text-[10px] text-muted">CHAT TERMINAL LOCKED</span>
              <p className="text-xs text-muted max-w-sm">
                Join the event RSVP list to access real-time encrypted signal chat channels.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EventDetailPage;

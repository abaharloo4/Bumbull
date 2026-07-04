import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockStore } from '../../store/mockStore';
import { PixelCard, PixelButton } from '../../components/ui/PixelComponents';
import { Calendar, MapPin, Users } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const { eventsList, myEventsList, fetchEvents, fetchMyEvents } = useMockStore();

  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [cityFilter, setCityFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchEvents(cityFilter ? { city: cityFilter } : undefined),
          fetchMyEvents(),
        ]);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [fetchEvents, fetchMyEvents, cityFilter]);

  const displayedEvents = activeTab === 'all' ? eventsList : myEventsList;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 font-mono select-none text-left">
      {/* Page Header */}
      <div className="mb-8 border-b-4 border-black pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-pixel text-lg text-white mb-2">COMMUNITY EVENTS</h1>
          <p className="text-sm text-muted">Join real-world meetups, match face-to-face, and secure local signals.</p>
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-3">
          <span className="font-pixel text-[8px] text-accent">CITY FILTER:</span>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="border-4 border-black bg-surface p-2 text-xs font-mono text-text outline-none focus:border-primary"
          >
            <option value="">ALL CITIES</option>
            <option value="tehran">TEHRAN</option>
            <option value="shiraz">SHIRAZ</option>
            <option value="esfahan">ESFAHAN</option>
            <option value="mashhad">MASHHAD</option>
          </select>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 border-4 border-black font-pixel text-[9px] cursor-pointer transition-all active:translate-x-[1px] active:translate-y-[1px] ${
            activeTab === 'all' ? 'bg-primary text-white shadow-pixel-sm' : 'bg-surface text-muted'
          }`}
        >
          ALL EVENTS
        </button>
        <button
          onClick={() => setActiveTab('my')}
          className={`px-4 py-2 border-4 border-black font-pixel text-[9px] cursor-pointer transition-all active:translate-x-[1px] active:translate-y-[1px] ${
            activeTab === 'my' ? 'bg-primary text-white shadow-pixel-sm' : 'bg-surface text-muted'
          }`}
        >
          MY SIGNALS ({myEventsList.length})
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-12">
          <span className="font-pixel text-xs text-accent animate-pulse block">SCANNING SECURE BROADCASTS...</span>
        </div>
      ) : displayedEvents.length === 0 ? (
        <div className="text-center py-12 border-4 border-dashed border-black bg-surface/20">
          <span className="font-pixel text-[10px] text-muted block mb-2">NO SIGNALS DETECTED</span>
          <p className="text-sm text-text/6xl">Check filters or explore another city sector.</p>
        </div>
      ) : (
        /* Events Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedEvents.map((event) => {
            const isRSVPed = myEventsList.some(me => me.id === event.id);
            // Check status in case waitlisted
            const isWaitlist = event.is_waitlisted;

            return (
              <PixelCard key={event.id} shadowVariant={isRSVPed ? 'primary' : 'default'} className="flex flex-col justify-between min-h-[300px]">
                <div>
                  {/* Badge Row */}
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className="font-pixel text-[8px] text-accent bg-black px-2 py-1">
                      {event.city.toUpperCase()}
                    </span>

                    {isRSVPed && (
                      <span className={`font-pixel text-[8px] px-2 py-1 border-2 border-black ${
                        isWaitlist ? 'bg-accent text-black' : 'bg-success text-black'
                      }`}>
                        {isWaitlist ? '● WAITLISTED' : '✓ RSVP\'D'}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-pixel text-sm text-white mb-3 hover:text-primary transition-colors cursor-pointer truncate" onClick={() => navigate(`/events/${event.id}`)}>
                    {event.title.toUpperCase()}
                  </h3>
                  <p className="text-sm text-muted line-clamp-3 mb-4 min-h-[60px]">
                    {event.description}
                  </p>
                </div>

                {/* Details Footer */}
                <div className="border-t-2 border-black pt-4 mt-2">
                  <div className="flex flex-col gap-2 mb-4 text-xs text-text">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <span>{formatDate(event.date_time)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary" />
                      <span>{event.area_label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-primary" />
                        <span>Spots: {event.current_participants} / {event.capacity}</span>
                      </div>
                      {event.is_full && !isRSVPed && (
                        <span className="text-[10px] text-accent font-pixel animate-pulse">FULL (WAITLIST OPEN)</span>
                      )}
                    </div>
                  </div>

                  <PixelButton
                    onClick={() => navigate(`/events/${event.id}`)}
                    variant={isRSVPed ? 'secondary' : 'primary'}
                    className="w-full text-center"
                    size="sm"
                  >
                    VIEW ACCESS TERMINAL
                  </PixelButton>
                </div>
              </PixelCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default EventsPage;

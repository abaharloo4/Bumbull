import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockStore, MOCK_INTERESTS } from '../../store/mockStore';
import { PixelCard, PixelInput, PixelSelect, PixelBadge } from '../../components/ui/PixelComponents';
import { LayoutGrid, CreditCard, SlidersHorizontal } from 'lucide-react';

export const DiscoveryPage: React.FC = () => {
  const navigate = useNavigate();
  const { swipeQueue, currentUser } = useMockStore();

  const [viewMode, setViewMode] = useState<'grid' | 'card'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [minAge, setMinAge] = useState('18');
  const [maxAge, setMaxAge] = useState('50');
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [selectedTier, setSelectedTier] = useState('all');
  const [nearbyOnly, setNearbyOnly] = useState(false);

  // Filter logic applied to the swiping queue (all mock profiles)
  const filteredUsers = useMemo(() => {
    // Generate pool of users (excluding ourselves if logged in)
    const pool = swipeQueue.filter(u => u.id !== currentUser?.id);

    return pool.filter((user) => {
      // Search Query
      if (searchQuery && !user.full_name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // City Filter
      if (selectedCity !== 'all' && user.city_lives !== selectedCity) {
        return false;
      }
      // Age Range Filter
      const userAge = user.age || 25;
      if (userAge < parseInt(minAge, 10) || userAge > parseInt(maxAge, 10)) {
        return false;
      }
      // Interest Filters
      if (selectedInterests.length > 0) {
        const hasMatchingInterest = selectedInterests.some(id => 
          user.interestsList?.some(i => i.id === id)
        );
        if (!hasMatchingInterest) return false;
      }
      // Membership Tier Filter
      if (selectedTier !== 'all' && user.membership !== selectedTier) {
        return false;
      }
      return true;
    });
  }, [swipeQueue, currentUser, searchQuery, selectedCity, minAge, maxAge, selectedInterests, selectedTier]);

  const toggleInterestFilter = (id: number) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setMinAge('18');
    setMaxAge('50');
    setSelectedInterests([]);
    setSelectedTier('all');
    setNearbyOnly(false);
  };

  return (
    <div className="flex-1 p-6 text-left font-mono select-none">
      {/* Discovery Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-pixel text-lg text-white mb-2">DISCOVERY PANEL</h1>
          <p className="font-mono text-xs text-muted">Locate and browse active characters nearby</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Toggle Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 border-4 border-black font-pixel text-[9px] cursor-pointer flex items-center gap-2 ${
              showFilters ? 'bg-accent text-black shadow-pixel-sm' : 'bg-surface text-white hover:bg-bg'
            }`}
          >
            <SlidersHorizontal size={14} /> FILTERS
          </button>

          {/* Toggle View Mode Buttons */}
          <div className="flex border-4 border-black bg-surface">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 cursor-pointer ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted hover:text-white'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 border-l-4 border-black cursor-pointer ${viewMode === 'card' ? 'bg-primary text-white' : 'text-muted hover:text-white'}`}
            >
              <CreditCard size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Sidebar/Panel */}
      {showFilters && (
        <PixelCard shadowVariant="accent" className="mb-8 p-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Column 1: Search & City */}
            <div className="flex flex-col gap-4">
              <PixelInput
                label="Search Name"
                placeholder="e.g. Sara"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <PixelSelect
                label="Coordinates (City)"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                options={[
                  { value: 'all', label: 'All Cities' },
                  { value: 'tehran', label: 'Tehran' },
                  { value: 'shiraz', label: 'Shiraz' },
                  { value: 'isfahan', label: 'Isfahan' },
                  { value: 'gorgan', label: 'Gorgan' }
                ]}
              />
            </div>

            {/* Column 2: Age Sliders */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-pixel text-[10px] text-muted block mb-2">AGE MIN ({minAge} YEARS)</label>
                <input
                  type="range"
                  min="18"
                  max="100"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  className="w-full accent-primary bg-bg border-2 border-black"
                />
              </div>
              <div>
                <label className="font-pixel text-[10px] text-muted block mb-2">AGE MAX ({maxAge} YEARS)</label>
                <input
                  type="range"
                  min="18"
                  max="100"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  className="w-full accent-primary bg-bg border-2 border-black"
                />
              </div>
            </div>

            {/* Column 3: Membership Tier & Reset */}
            <div className="flex flex-col gap-4">
              <PixelSelect
                label="Rank (Tier)"
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                options={[
                  { value: 'all', label: 'All ranks' },
                  { value: 'bronze', label: 'Bronze' },
                  { value: 'silver', label: 'Silver' },
                  { value: 'gold', label: 'Gold' }
                ]}
              />

              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="nearby"
                  checked={nearbyOnly}
                  onChange={(e) => setNearbyOnly(e.target.checked)}
                  className="w-5 h-5 accent-primary border-4 border-black cursor-pointer"
                />
                <label htmlFor="nearby" className="font-pixel text-[9px] text-white cursor-pointer select-none">
                  NEARBY COORDINATES ONLY
                </label>
              </div>
            </div>
          </div>

          {/* Interest Selectors */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="font-pixel text-[10px] text-muted">INTEREST TAGS</label>
            <div className="flex flex-wrap gap-2">
              {MOCK_INTERESTS.map((i) => {
                const isSelected = selectedInterests.includes(i.id);
                return (
                  <button
                    key={i.id}
                    onClick={() => toggleInterestFilter(i.id)}
                    className={`font-pixel text-[8px] px-3 py-2 border-2 border-black cursor-pointer transition-all ${
                      isSelected ? 'bg-primary text-white shadow-pixel-sm translate-x-[1px] translate-y-[1px]' : 'bg-bg text-muted'
                    }`}
                  >
                    {i.name.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset button */}
          <div className="text-right">
            <button
              onClick={resetFilters}
              className="font-pixel text-[9px] text-muted hover:text-white cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
          </div>
        </PixelCard>
      )}

      {/* Grid View Output */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`/profile/${user.slug || user.id}`)}
              className="bg-surface border-4 border-black shadow-pixel hover:shadow-pixel-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-pixel-sm cursor-pointer transition-all flex flex-col h-[280px]"
            >
              {/* Photo Display */}
              <div className="flex-1 bg-secondary flex items-center justify-center text-6xl select-none overflow-hidden relative">
                <span>{user.avatarEmoji}</span>
                <div className="absolute top-2 right-2">
                  <PixelBadge tier={user.membership} />
                </div>
              </div>
              {/* Metadata */}
              <div className="p-3 bg-bg border-t-2 border-black text-left">
                <div className="font-pixel text-[10px] text-white truncate mb-1">
                  {user.first_name.toUpperCase()}, {user.age}
                </div>
                <div className="font-pixel text-[7px] text-muted">
                  {user.city_lives?.toUpperCase()}
                </div>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <span className="font-pixel text-xs text-muted">NO CHARACTERS MATCH FILTERS</span>
            </div>
          )}
        </div>
      )}

      {/* Card View Output */}
      {viewMode === 'card' && (
        <div className="flex flex-col items-center gap-8">
          {filteredUsers.map((user) => (
            <PixelCard
              key={user.id}
              onClick={() => navigate(`/profile/${user.slug || user.id}`)}
              className="w-full max-w-sm cursor-pointer hover:shadow-pixel-lg transition-shadow"
            >
              <div className="flex gap-4">
                {/* Photo */}
                <div className="w-24 h-24 border-4 border-black bg-secondary flex items-center justify-center text-5xl shrink-0">
                  {user.avatarEmoji}
                </div>
                {/* Metadata */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <span className="font-pixel text-sm text-white truncate">{user.first_name.toUpperCase()}</span>
                    <PixelBadge tier={user.membership} />
                  </div>
                  <div className="font-pixel text-[8px] text-accent mb-3">AGE: {user.age} | {user.city_lives?.toUpperCase()}</div>
                  <p className="font-mono text-xs text-muted line-clamp-2 leading-relaxed">{user.biography}</p>
                </div>
              </div>
            </PixelCard>
          ))}

          {filteredUsers.length === 0 && (
            <div className="py-16 text-center">
              <span className="font-pixel text-xs text-muted">NO CHARACTERS MATCH FILTERS</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

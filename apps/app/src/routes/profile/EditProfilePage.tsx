import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockStore, MOCK_INTERESTS } from '../../store/mockStore';
import { PixelCard, PixelInput, PixelSelect, PixelButton } from '../../components/ui/PixelComponents';
import { Save, Trash2, ArrowLeft, Plus } from 'lucide-react';

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile, reorderPhotos, deletePhoto, addPhoto } = useMockStore();

  const [firstName, setFirstName] = useState(currentUser?.first_name || '');
  const [lastName, setLastName] = useState(currentUser?.last_name || '');
  const [bio, setBio] = useState(currentUser?.biography || '');
  const [height, setHeight] = useState(currentUser?.height_cm?.toString() || '175');
  const [cityLives, setCityLives] = useState(currentUser?.city_lives || 'tehran');
  const [cityBirth, setCityBirth] = useState(currentUser?.city_birth || 'tehran');
  const [funQ, setFunQ] = useState(currentUser?.fun_question || 'My absolute favorite game is...');
  const [funA, setFunA] = useState(currentUser?.fun_answer || '');
  
  // Track selected interest IDs as strings
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    currentUser?.interestsList?.map(i => i.id.toString()) || []
  );

  const [error, setError] = useState('');

  const cityOptions = [
    { value: 'tehran', label: 'Tehran' },
    { value: 'shiraz', label: 'Shiraz' },
    { value: 'isfahan', label: 'Isfahan' },
    { value: 'gorgan', label: 'Gorgan' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName) return setError('First Name is required');
    if (bio.length < 20) return setError('Biography must be at least 20 characters');
    if (selectedInterests.length < 3) return setError('Select at least 3 interests');

    // Resolve full interest structures
    const updatedInterests = selectedInterests.map(idStr => {
      const id = parseInt(idStr, 10);
      return MOCK_INTERESTS.find(i => i.id === id);
    }).filter(Boolean);

    updateProfile({
      first_name: firstName,
      last_name: lastName,
      biography: bio,
      height_cm: parseInt(height, 10),
      city_lives: cityLives,
      city_birth: cityBirth,
      fun_question: funQ,
      fun_answer: funA,
      interestsList: updatedInterests as any
    });

    navigate('/profile/me');
  };

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file) {
      addPhoto(file);
    }
  };

  const handlePhotoDelete = (id: number) => {
    if (currentUser && currentUser.photosList.length <= 3) {
      setError('You must keep at least 3 photos');
      return;
    }
    deletePhoto(id);
    setError('');
  };

  const handleShiftPhoto = (index: number, direction: 'left' | 'right') => {
    if (!currentUser) return;
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    const photos = [...currentUser.photosList];
    if (targetIdx < 0 || targetIdx >= photos.length) return;

    // Build the order commands array
    const updatedOrders = photos.map((p, idx) => {
      if (idx === index) return { id: p.id, order: targetIdx };
      if (idx === targetIdx) return { id: p.id, order: index };
      return { id: p.id, order: idx };
    });

    reorderPhotos(updatedOrders);
  };


  if (!currentUser) return null;

  return (
    <div className="flex-1 p-6 text-left font-mono select-none max-w-2xl mx-auto">
      {/* Header back */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/profile/me')}
          className="px-3 py-1.5 border-2 border-black bg-surface hover:bg-bg text-white font-pixel text-[8px] active:translate-x-[1px] active:translate-y-[1px] flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft size={10} /> CANCEL
        </button>
        <span className="font-pixel text-[10px] text-accent">MODIFY MY STATS</span>
      </div>

      <PixelCard shadowVariant="primary" className="p-8">
        {error && (
          <div className="mb-6 p-3 border-4 border-black bg-red-500/10 text-[#f43f5e] font-pixel text-[9px]">
            ERROR: {error.toUpperCase()}
          </div>
        )}

        {/* Photo Management Section */}
        <div className="mb-8">
          <label className="font-pixel text-[10px] text-muted block mb-3">PHOTO DECK (3-7 PHOTOS)</label>
          <div className="grid grid-cols-3 gap-4">
            {currentUser.photosList?.map((photo, index) => (
              <div key={photo.id} className="relative bg-secondary border-4 border-black p-1 shadow-pixel-sm group">
                <div className="aspect-square bg-[#0f3460] flex items-center justify-center text-4xl overflow-hidden select-none">
                  {photo.image_url.startsWith('blob:') || photo.image_url.startsWith('data:') ? (
                    <img src={photo.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{photo.image_url}</span>
                  )}
                </div>
                {index === 0 && (
                  <div className="absolute top-1 left-1 bg-accent border-2 border-black text-black font-pixel text-[6px] px-1 py-0.5">
                    PRIMARY
                  </div>
                )}
                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-1 transition-opacity">
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => handlePhotoDelete(photo.id)}
                      className="bg-[#f43f5e] border-2 border-black text-white p-1 cursor-pointer active:translate-y-0.5"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => handleShiftPhoto(index, 'left')}
                      disabled={index === 0}
                      className="bg-primary border-2 border-black text-white font-pixel text-[6px] px-1 py-0.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      ◀
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShiftPhoto(index, 'right')}
                      disabled={index === currentUser.photosList.length - 1}
                      className="bg-primary border-2 border-black text-white font-pixel text-[6px] px-1 py-0.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      ▶
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Photo block */}
            {currentUser.photosList?.length < 7 && (
              <label className="border-4 border-dashed border-muted hover:border-white bg-surface flex flex-col items-center justify-center aspect-square cursor-pointer transition-colors">
                <Plus size={20} className="text-muted" />
                <span className="font-pixel text-[6px] text-muted mt-2">ADD FILE</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Form Body fields */}
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <PixelInput
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <PixelInput
              label="Last Name (Optional)"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-pixel text-[10px] text-muted">BIOGRAPHY (MIN 20 CHARS)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full h-24 border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary resize-none"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <PixelInput
              label="Height (cm)"
              type="number"
              min="100"
              max="250"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
            <PixelSelect
              label="Current City"
              value={cityLives}
              onChange={(e) => setCityLives(e.target.value)}
              options={cityOptions}
            />
            <PixelSelect
              label="City of Birth"
              value={cityBirth}
              onChange={(e) => setCityBirth(e.target.value)}
              options={cityOptions}
            />
          </div>



          {/* Interests */}
          <div className="flex flex-col gap-2">
            <label className="font-pixel text-[10px] text-muted">INTEREST TAGS (MIN 3)</label>
            <div className="flex flex-wrap gap-2">
              {MOCK_INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id.toString());
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => handleInterestToggle(interest.id.toString())}
                    className={`font-pixel text-[8px] px-3 py-2 border-2 border-black cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-accent text-black shadow-pixel-sm translate-x-[1px] translate-y-[1px]'
                        : 'bg-surface text-muted hover:text-white'
                    }`}
                  >
                    {interest.name.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Q&A */}
          <div className="flex flex-col gap-4">
            <PixelSelect
              label="Fun Question Card"
              value={funQ}
              onChange={(e) => setFunQ(e.target.value)}
              options={[
                { value: 'My absolute favorite game is...', label: 'My absolute favorite game is...' },
                { value: 'Ideal date plan...', label: 'Ideal date plan...' },
                { value: 'First thing I search on google is...', label: 'First thing I search on google is...' }
              ]}
            />
            <PixelInput
              placeholder="Write your answer..."
              value={funA}
              onChange={(e) => setFunA(e.target.value)}
            />
          </div>

          {/* Save Action */}
          <PixelButton type="submit" variant="primary" className="py-3 mt-4 flex items-center justify-center gap-2">
            <Save size={16} /> SAVE SETTINGS
          </PixelButton>
        </form>
      </PixelCard>
    </div>
  );
};

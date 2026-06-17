'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function RegisterPage() {
  const router = useRouter();

  // Step wizard state
  const [regStep, setRegStep] = useState(1);
  const [error, setError] = useState('');

  // Step 1 Form States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('M');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  // Step 2 Verification state
  const [verificationOtp, setVerificationOtp] = useState('');
  
  // Step 3 Profile States
  const [bio, setBio] = useState('');
  const [height, setHeight] = useState('170');
  const [cityLives, setCityLives] = useState('tehran');
  const [cityBirth, setCityBirth] = useState('tehran');
  const [interests, setInterests] = useState<string[]>([]);
  const [funQ, setFunQ] = useState('My absolute favorite game is...');
  const [funA, setFunA] = useState('');

  // Step 4 Photo States
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    '🧔', '💻', '☕' // Default mock pixel assets
  ]);

  const cityOptions = [
    { value: 'tehran', label: 'Tehran' },
    { value: 'shiraz', label: 'Shiraz' },
    { value: 'isfahan', label: 'Isfahan' },
    { value: 'gorgan', label: 'Gorgan' }
  ];

  const mockInterestsList = [
    { id: '1', name: 'Gaming' },
    { id: '2', name: 'Anime' },
    { id: '3', name: 'Coding' },
    { id: '4', name: 'Coffee' },
    { id: '5', name: 'Music' },
    { id: '6', name: 'Boardgames' },
    { id: '7', name: 'Photography' },
    { id: '8', name: 'Camping' },
  ];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return setError('Phone number is required');
    if (!/^09\d{9}$/.test(phoneNumber)) return setError('Phone number must be 11 digits starting with 09');
    if (!firstName) return setError('First Name is required');
    if (!dob) return setError('Date of Birth is required');
    if (!password) return setError('Password is required');
    if (password !== passwordConfirm) return setError('Passwords do not match');

    // Validate 18+
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 18) return setError('You must be at least 18 years old to join Bumbul');

    // Generate random OTP code
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationOtp(generated);
    setRegStep(2);
    setError('');
  };

  const handleSimulateVerify = () => {
    setRegStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bio.length < 20) return setError('Biography must be at least 20 characters');
    if (interests.length < 3) return setError('Please select at least 3 interests');

    setRegStep(4);
    setError('');
  };

  const toggleInterest = (interestId: string) => {
    setInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = [...uploadedPhotos];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        newPhotos.push(objectUrl);
      }
    }
    setUploadedPhotos(newPhotos);
  };

  const deletePhoto = (index: number) => {
    if (uploadedPhotos.length <= 3) {
      setError('You must keep at least 3 photos');
      return;
    }
    setUploadedPhotos(prev => prev.filter((_, idx) => idx !== index));
    setError('');
  };

  const shiftPhotoOrder = (index: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= uploadedPhotos.length) return;

    const list = [...uploadedPhotos];
    const temp = list[index];
    list[index] = list[targetIdx]!;
    list[targetIdx] = temp!;
    setUploadedPhotos(list);
  };

  const handleCompleteRegistration = () => {
    if (uploadedPhotos.length < 3) {
      setError('You must upload at least 3 photos');
      return;
    }

    // Save to shared localhost cookie for cross-port mockup sync
    const normalizedPhone = phoneNumber.startsWith('09') ? '+98' + phoneNumber.slice(1) : phoneNumber;
    const userData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: normalizedPhone,
      gender: gender,
      biography: bio,
      height_cm: height,
      city_lives: cityLives,
      city_birth: cityBirth,
      interests: interests,
      fun_question: funQ,
      fun_answer: funA,
      photos: uploadedPhotos
    };

    document.cookie = `mock_logged_in=true; path=/; max-age=86400`;
    document.cookie = `mock_user_data=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400`;

    // Success, redirect to React SPA dashboard
    window.location.href = 'http://localhost:5173/swipe';
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-8 font-mono select-none">
      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-6 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold text-lg shadow-pixel-sm">
            B
          </div>
          <span className="font-pixel text-xl text-white tracking-widest">BUMBUL</span>
        </div>

        {/* Wizard Header Progress Bar */}
        <div className="bg-surface border-4 border-black p-4 mb-6">
          <div className="flex justify-between items-center font-pixel text-[9px] text-muted mb-2">
            <span>CHARACTER CREATION</span>
            <span>STEP {regStep} OF 4</span>
          </div>
          <div className="w-full h-6 border-4 border-black bg-bg p-0.5 relative">
            <div
              className="h-full bg-primary border-r-2 border-black transition-all duration-300"
              style={{ width: `${regStep * 25}%` }}
            />
          </div>
        </div>

        {/* Card Body */}
        <div className="bg-surface border-4 border-black p-8 shadow-pixel text-left">
          {error && (
            <div className="mb-6 p-3 border-4 border-black bg-red-500/10 text-[#f43f5e] font-pixel text-[9px]">
              ERROR: {error.toUpperCase()}
            </div>
          )}

          {/* STEP 1 */}
          {regStep === 1 && (
            <form onSubmit={handleStep1Submit} className="flex flex-col gap-6">
              <h2 className="font-pixel text-xs text-white mb-2">STEP 1: BASIC STATS</h2>

              <div className="flex flex-col gap-2 w-full">
                <label className="font-pixel text-[10px] text-muted">PHONE NUMBER</label>
                <input
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 09123456789"
                  maxLength={11}
                  className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">FIRST NAME</label>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Amir"
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">LAST NAME (OPTIONAL)</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Dehghani"
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">BIRTH DATE (18+)</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">GENDER</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary appearance-none cursor-pointer"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">PASSWORD</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    required
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="font-pixel text-[10px] text-muted">INVITE CODE (OPTIONAL)</label>
                <input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="e.g. CODESX"
                  className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-primary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  CONTINUE TO VERIFY
                </button>
                <div className="text-center">
                  <span className="font-mono text-sm text-muted">Already a player? </span>
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="font-pixel text-[9px] text-primary hover:underline cursor-pointer"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {regStep === 2 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-pixel text-xs text-white mb-2">STEP 2: TELEGRAM SYNC</h2>

              <p className="font-mono text-sm text-muted">
                Your character has been drafted. Link your phone number via Telegram to activate.
              </p>

              <div className="border-4 border-black bg-bg p-6 text-center">
                <span className="font-pixel text-[9px] text-muted block mb-3">TELEGRAM OTP CODE</span>
                <span className="font-pixel text-4xl text-accent tracking-widest block animate-pulse">
                  {verificationOtp}
                </span>
              </div>

              <div className="font-mono text-sm text-muted">
                <p className="mb-2"><b>1.</b> Open Telegram Bot: <a href="https://t.me/bumbullbot" target="_blank" className="text-primary hover:underline">@bumbullbot</a></p>
                <p className="mb-2"><b>2.</b> Send code: <b>{verificationOtp}</b></p>
                <p><b>3.</b> Press share contact so the bot verifies your phone.</p>
              </div>

              <a
                href="https://t.me/bumbullbot"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-secondary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm block text-center hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                OPEN TELEGRAM BOT
              </a>

              <div className="border-t-2 border-black my-2"></div>
              <span className="font-pixel text-[8px] text-muted block animate-pulse text-center">AWAITING TELEGRAM WEBHOOK...</span>

              <button
                onClick={handleSimulateVerify}
                className="w-full py-3 bg-success border-4 border-black text-black font-pixel text-xs shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                SIMULATE TELEGRAM VERIFICATION SUCCESS
              </button>

              <button
                onClick={() => setRegStep(1)}
                className="font-pixel text-[8px] text-muted text-center hover:underline mt-2"
              >
                BACK TO STEP 1
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {regStep === 3 && (
            <form onSubmit={handleStep3Submit} className="flex flex-col gap-6">
              <h2 className="font-pixel text-xs text-white mb-2">STEP 3: PROFILE STATS</h2>

              <div className="flex flex-col gap-2">
                <label className="font-pixel text-[10px] text-muted">BIOGRAPHY (MIN 20 CHARS)</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell others about yourself. Hobby, vibes, games..."
                  className="w-full h-24 border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary resize-none"
                  maxLength={1000}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">HEIGHT (CM)</label>
                  <input
                    type="number"
                    min="100"
                    max="250"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">CURRENT CITY</label>
                  <select
                    value={cityLives}
                    onChange={(e) => setCityLives(e.target.value)}
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary appearance-none cursor-pointer"
                  >
                    {cityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">CITY OF BIRTH</label>
                  <select
                    value={cityBirth}
                    onChange={(e) => setCityBirth(e.target.value)}
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary appearance-none cursor-pointer"
                  >
                    {cityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-pixel text-[10px] text-muted">SELECT INTERESTS (MIN 3)</label>
                <div className="flex flex-wrap gap-2">
                  {mockInterestsList.map((interest) => {
                    const isSelected = interests.includes(interest.id);
                    return (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => toggleInterest(interest.id)}
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

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-pixel text-[10px] text-muted">FUN QUESTION</label>
                  <select
                    value={funQ}
                    onChange={(e) => setFunQ(e.target.value)}
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary appearance-none cursor-pointer"
                  >
                    <option value="My absolute favorite game is...">My absolute favorite game is...</option>
                    <option value="Ideal date plan...">Ideal date plan...</option>
                    <option value="First thing I search on google is...">First thing I search on google is...</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <input
                    placeholder="Write your answer..."
                    value={funA}
                    onChange={(e) => setFunA(e.target.value)}
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer mt-4"
              >
                CONTINUE TO PHOTOS
              </button>
            </form>
          )}

          {/* STEP 4 */}
          {regStep === 4 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-pixel text-xs text-white mb-2">STEP 4: PHOTOS (3-6 REQUIRED)</h2>

              <p className="font-mono text-sm text-muted">
                Upload your pixel character photos. Drag, drop, or use actions to re-order. The first photo is your primary.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="relative bg-secondary border-4 border-black p-1 shadow-pixel-sm group">
                    <div className="aspect-square bg-[#0f3460] flex items-center justify-center text-4xl overflow-hidden">
                      {photo.startsWith('blob:') || photo.startsWith('data:') ? (
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span>{photo}</span>
                      )}
                    </div>
                    {index === 0 && (
                      <div className="absolute top-1 left-1 bg-accent border-2 border-black text-black font-pixel text-[6px] px-1 py-0.5 shadow-pixel-sm">
                        PRIMARY
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-right">
                        <button
                          onClick={() => deletePhoto(index)}
                          className="bg-[#f43f5e] border-2 border-black text-white font-pixel text-[8px] px-1.5 py-0.5 cursor-pointer shadow-pixel-sm"
                        >
                          X
                        </button>
                      </div>
                      <div className="flex justify-between">
                        <button
                          onClick={() => shiftPhotoOrder(index, 'left')}
                          disabled={index === 0}
                          className="bg-primary border-2 border-black text-white font-pixel text-[6px] px-1 py-0.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => shiftPhotoOrder(index, 'right')}
                          disabled={index === uploadedPhotos.length - 1}
                          className="bg-primary border-2 border-black text-white font-pixel text-[6px] px-1 py-0.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          ▶
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {uploadedPhotos.length < 6 && (
                  <label className="border-4 border-dashed border-muted hover:border-white bg-surface flex flex-col items-center justify-center aspect-square cursor-pointer transition-colors">
                    <span className="font-pixel text-lg text-muted">+</span>
                    <span className="font-pixel text-[6px] text-muted mt-2">ADD PHOTO</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <button
                onClick={handleCompleteRegistration}
                className="w-full py-3 bg-success border-4 border-black text-black font-pixel text-xs shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer mt-6"
              >
                FINALIZE CHARACTER
              </button>

              <button
                onClick={() => setRegStep(3)}
                className="font-pixel text-[8px] text-muted text-center hover:underline mt-2"
              >
                BACK TO STEP 3
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

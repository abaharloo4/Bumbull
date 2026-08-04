import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockStore } from '../../store/mockStore';
import { PixelButton, PixelCard, PixelInput, PixelSelect, PixelProgressBar } from '../../components/ui/PixelComponents';
import { Camera, RefreshCw, Send, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    validateInvite,
    registerBasicInfo,
    checkOtpStatus,
    continueRegistration,
    saveProfileDetails,
    uploadPhotos,
    uploadSelfie,
    resendOtp,
    currentUser
  } = useMockStore();

  // Wizard Step state (1 to 6)
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Invite Code State
  const [inviteCodeInput, setInviteCodeInput] = useState('');

  // Step 2: Basic Stats State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('M');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Step 3: Telegram Verification State
  const [verificationOtp, setVerificationOtp] = useState('');
  const [botUsername, setBotUsername] = useState('bumbullbot');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Step 4: Profile Details State
  const [bio, setBio] = useState('');
  const [height, setHeight] = useState('170');
  const [cityLives, setCityLives] = useState('tehran');
  const [cityBirth, setCityBirth] = useState('tehran');

  // Step 5: Photo Upload State
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  // Step 6: Selfie Verification State
  const [fingerCount] = useState(() => Math.floor(Math.random() * 5) + 1); // 1 to 5
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string>('');

  // Status & Error
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check user state on load
  useEffect(() => {
    if (currentUser) {
      if (currentUser.is_active === false) {
        navigate('/wait-verification');
      }
    }
  }, [currentUser, navigate]);

  // Step 3 Polling Effect for OTP Verification
  useEffect(() => {
    let intervalId: any;
    if (currentStep === 3 && verificationOtp && !isOtpVerified) {
      intervalId = setInterval(async () => {
        try {
          const res = await checkOtpStatus(verificationOtp);
          if (res.status === 'verified' && res.continue_token) {
            setIsOtpVerified(true);
            clearInterval(intervalId);
            // Automatically log in and proceed to step 4
            const contRes = await continueRegistration(res.continue_token);
            if (contRes.success) {
              setCurrentStep(4);
            }
          }
        } catch (e) {
          // ignore transient polling errors
        }
      }, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentStep, verificationOtp, isOtpVerified, checkOtpStatus, continueRegistration]);

  const cityOptions = [
    { value: 'tehran', label: 'Tehran' },
    { value: 'shiraz', label: 'Shiraz' },
    { value: 'isfahan', label: 'Isfahan' },
    { value: 'gorgan', label: 'Gorgan' },
    { value: 'mashhad', label: 'Mashhad' },
    { value: 'tabriz', label: 'Tabriz' }
  ];

  // ----------------------------------------------------
  // Step Handlers
  // ----------------------------------------------------

  // Step 1: Submit Invitation Code
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const code = inviteCodeInput.trim().toUpperCase();
    if (!code) return setError('Invitation code is required.');

    setLoading(true);
    try {
      const res = await validateInvite(code);
      if (res.success) {
        setCurrentStep(2);
      } else {
        setError(res.message || 'Invalid or expired invitation code.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to validate invitation code.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit Basic Stats
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!firstName.trim()) return setError('First name is required.');
    if (!dob) return setError('Date of birth is required.');
    if (!password) return setError('Password is required.');
    if (password !== passwordConfirm) return setError('Passwords do not match.');

    // Age validation (18+)
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 18) return setError('You must be at least 18 years old to register.');

    setLoading(true);
    try {
      const res = await registerBasicInfo({
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dob,
        gender,
        password,
        confirm_password: passwordConfirm
      });
      if (res.success && res.otp) {
        setVerificationOtp(res.otp);
        if (res.bot_username) setBotUsername(res.bot_username);
        setCurrentStep(3);
      } else {
        setError(res.message || 'Failed to submit basic information.');
      }
    } catch (err: any) {
      setError(err.message || 'Basic info registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Manual Proceed / Token Submit
  const handleStep3ManualCheck = async () => {
    if (!verificationOtp) return;
    setLoading(true);
    setError('');
    try {
      const res = await checkOtpStatus(verificationOtp);
      if (res.status === 'verified' && res.continue_token) {
        setIsOtpVerified(true);
        const contRes = await continueRegistration(res.continue_token);
        if (contRes.success) {
          setCurrentStep(4);
        } else {
          setError(contRes.message || 'Verification token failed.');
        }
      } else {
        setError('Verification pending. Please make sure you sent the 6-digit code to the Telegram bot.');
      }
    } catch (err: any) {
      setError(err.message || 'OTP verification check failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await resendOtp();
      if (res.success && res.otp) {
        setVerificationOtp(res.otp);
      } else {
        setError(res.message || 'Failed to resend OTP.');
      }
    } catch (err: any) {
      setError(err.message || 'Resend OTP failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Submit Profile Details
  const handleStep4Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (bio.trim().length < 20) return setError('Biography must be at least 20 characters.');

    setLoading(true);
    try {
      const res = await saveProfileDetails({
        city_birth: cityBirth,
        city_lives: cityLives,
        height_cm: Number(height),
        biography: bio
      });
      if (res.success) {
        setCurrentStep(5);
      } else {
        setError(res.message || 'Failed to save profile details.');
      }
    } catch (err: any) {
      setError(err.message || 'Profile details submission failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 5: Photos Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = [...uploadedPhotos];
    const newFiles = [...photoFiles];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        newPhotos.push(objectUrl);
        newFiles.push(file);
      }
    }
    setUploadedPhotos(newPhotos);
    setPhotoFiles(newFiles);
  };

  const deletePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, idx) => idx !== index));
    setPhotoFiles(prev => prev.filter((_, idx) => idx !== index));
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

    const filesList = [...photoFiles];
    const tempFile = filesList[index];
    filesList[index] = filesList[targetIdx]!;
    filesList[targetIdx] = tempFile!;
    setPhotoFiles(filesList);
  };

  const handleStep5Submit = async () => {
    if (photoFiles.length < 3) {
      return setError('You must upload at least 3 photos (up to 6).');
    }
    setLoading(true);
    setError('');
    try {
      const res = await uploadPhotos(photoFiles);
      if (res.success) {
        setCurrentStep(6);
      } else {
        setError(res.message || 'Failed to upload photos.');
      }
    } catch (err: any) {
      setError(err.message || 'Photo upload failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 6: Selfie Submission
  const handleSelfieSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelfieFile(file);
      setSelfiePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleStep6Submit = async () => {
    if (!selfieFile) {
      return setError('Please upload a selfie photo showing the required gesture.');
    }
    setLoading(true);
    setError('');
    try {
      const res = await uploadSelfie(selfieFile);
      if (res.success) {
        navigate('/wait-verification');
      } else {
        setError(res.message || 'Failed to upload selfie.');
      }
    } catch (err: any) {
      setError(err.message || 'Selfie upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-8 font-mono select-none">
      <div className="w-full max-w-lg relative z-10">
        {/* Logo Header */}
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="w-10 h-10 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold text-lg shadow-pixel-sm">
            B
          </div>
          <span className="font-pixel text-xl text-white tracking-widest">BUMBULL</span>
        </div>

        {/* Wizard Header Progress Bar */}
        <div className="bg-surface border-4 border-black p-4 mb-6">
          <div className="flex justify-between items-center font-pixel text-[9px] text-muted mb-2">
            <span>REGISTRATION</span>
            <span>STEP {currentStep} OF 6</span>
          </div>
          <PixelProgressBar value={Math.round((currentStep / 6) * 100)} />
        </div>

        {/* Card Body */}
        <PixelCard shadowVariant="primary" className="p-8 text-left">
          {error && (
            <div className="mb-6 p-3 border-4 border-black bg-red-500/10 text-[#f43f5e] font-pixel text-[9px]">
              ERROR: {error.toUpperCase()}
            </div>
          )}

          {/* ==================================== */}
          {/* STEP 1: INVITATION CODE              */}
          {/* ==================================== */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1Submit} className="flex flex-col gap-6">
              <div>
                <h2 className="font-pixel text-xs text-white mb-2">STEP 1: INVITATION CODE</h2>
                <p className="font-mono text-sm text-muted">
                  Bumbull is an exclusive community. An invitation code is required to create a new profile.
                </p>
              </div>

              <PixelInput
                label="Invitation Code"
                placeholder="e.g. BMBL88"
                value={inviteCodeInput}
                onChange={(e) => setInviteCodeInput(e.target.value)}
                required
              />

              <div className="flex flex-col gap-4 mt-2">
                <PixelButton type="submit" variant="primary" className="py-3 flex items-center justify-center gap-2" disabled={loading}>
                  {loading ? 'VALIDATING...' : 'VALIDATE CODE'} <ArrowRight size={16} />
                </PixelButton>

                <div className="text-center">
                  <span className="font-mono text-sm text-muted">Already registered? </span>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-pixel text-[9px] text-primary hover:underline cursor-pointer"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ==================================== */}
          {/* STEP 2: BASIC STATS                  */}
          {/* ==================================== */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2Submit} className="flex flex-col gap-6">
              <h2 className="font-pixel text-xs text-white mb-2">STEP 2: BASIC STATS</h2>

              <div className="flex flex-col sm:flex-row gap-6">
                <PixelInput
                  label="First Name"
                  placeholder="e.g. Amir"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <PixelInput
                  label="Last Name (Optional)"
                  placeholder="e.g. Dehghani"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <PixelInput
                  label="Birth Date (18+)"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
                <PixelSelect
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  options={[
                    { value: 'M', label: 'Male' },
                    { value: 'F', label: 'Female' }
                  ]}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <PixelInput
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PixelInput
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <PixelButton type="submit" variant="primary" className="py-3" disabled={loading}>
                  {loading ? 'GENERATING OTP...' : 'CONTINUE TO TELEGRAM VERIFICATION'}
                </PixelButton>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="font-pixel text-[8px] text-muted text-center hover:underline cursor-pointer"
                >
                  BACK TO STEP 1
                </button>
              </div>
            </form>
          )}

          {/* ==================================== */}
          {/* STEP 3: TELEGRAM VERIFICATION        */}
          {/* ==================================== */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-pixel text-xs text-white mb-2">STEP 3: TELEGRAM PHONE VERIFICATION</h2>

              <p className="font-mono text-sm text-muted">
                To verify your phone number, send the 6-digit OTP code below to our Telegram bot.
              </p>

              <div className="border-4 border-black bg-bg p-6 text-center">
                <span className="font-pixel text-[9px] text-muted block mb-3">YOUR 6-DIGIT OTP CODE</span>
                <span className="font-pixel text-4xl text-accent tracking-widest block animate-pulse">
                  {verificationOtp || '------'}
                </span>
              </div>

              <div className="font-mono text-sm text-muted flex flex-col gap-2 bg-surface p-4 border-2 border-black">
                <p><b>1.</b> Open Telegram Bot: <a href={`https://t.me/${botUsername}`} target="_blank" rel="noreferrer" className="text-primary hover:underline font-bold">@{botUsername}</a></p>
                <p><b>2.</b> Send your OTP code: <b className="text-accent">{verificationOtp}</b></p>
                <p><b>3.</b> Share your contact in the bot to verify your phone number.</p>
              </div>

              <a
                href={`https://t.me/${botUsername}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-secondary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm block text-center hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                <span className="flex items-center justify-center gap-2">
                  <Send size={16} /> OPEN TELEGRAM BOT
                </span>
              </a>

              <div className="flex flex-col gap-3 mt-2">
                <PixelButton onClick={handleStep3ManualCheck} variant="success" className="py-3 flex items-center justify-center gap-2" disabled={loading}>
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                  {loading ? 'VERIFYING...' : 'I HAVE SENT THE CODE (CHECK STATUS)'}
                </PixelButton>

                <button
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="font-pixel text-[9px] text-accent text-center hover:underline cursor-pointer"
                >
                  RESEND NEW OTP CODE
                </button>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* STEP 4: PROFILE DETAILS              */}
          {/* ==================================== */}
          {currentStep === 4 && (
            <form onSubmit={handleStep4Submit} className="flex flex-col gap-6">
              <h2 className="font-pixel text-xs text-white mb-2">STEP 4: PROFILE DETAILS</h2>

              <div className="flex flex-col gap-2">
                <label className="font-pixel text-[10px] text-muted">BIOGRAPHY (MIN 20 CHARS)</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell others about yourself. Hobby, vibes, games..."
                  className="w-full h-28 border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary resize-none"
                  maxLength={1000}
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

              <PixelButton type="submit" variant="primary" className="py-3 mt-4" disabled={loading}>
                {loading ? 'SAVING...' : 'CONTINUE TO PHOTOS'}
              </PixelButton>
            </form>
          )}

          {/* ==================================== */}
          {/* STEP 5: PHOTO UPLOAD (3-6 PHOTOS)    */}
          {/* ==================================== */}
          {currentStep === 5 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-pixel text-xs text-white mb-2">STEP 5: UPLOAD PHOTOS (3-6 REQUIRED)</h2>

              <p className="font-mono text-sm text-muted">
                Upload 3 to 6 photos for your profile card. The first photo will be your primary photo.
              </p>

              {/* Photo Preview Grid */}
              <div className="grid grid-cols-3 gap-4">
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="relative bg-secondary border-4 border-black p-1 shadow-pixel-sm group">
                    <div className="aspect-square bg-[#0f3460] flex items-center justify-center text-4xl overflow-hidden">
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                    </div>
                    {/* Primary Badge */}
                    {index === 0 && (
                      <div className="absolute top-1 left-1 bg-accent border-2 border-black text-black font-pixel text-[6px] px-1 py-0.5 shadow-pixel-sm">
                        PRIMARY
                      </div>
                    )}
                    {/* Controls */}
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
                          className="bg-primary border-2 border-black text-white font-pixel text-[6px] px-1 py-0.5 disabled:opacity-40 cursor-pointer"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => shiftPhotoOrder(index, 'right')}
                          disabled={index === uploadedPhotos.length - 1}
                          className="bg-primary border-2 border-black text-white font-pixel text-[6px] px-1 py-0.5 disabled:opacity-40 cursor-pointer"
                        >
                          ▶
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Photo Input Block */}
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

              <PixelButton onClick={handleStep5Submit} variant="primary" className="py-3 mt-4" disabled={loading}>
                {loading ? 'UPLOADING...' : 'CONTINUE TO SELFIE VERIFICATION'}
              </PixelButton>
            </div>
          )}

          {/* ==================================== */}
          {/* STEP 6: SELFIE VERIFICATION          */}
          {/* ==================================== */}
          {currentStep === 6 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-pixel text-xs text-white mb-2">STEP 6: SELFIE VERIFICATION</h2>

              <p className="font-mono text-sm text-muted">
                To prevent fake accounts, take a selfie holding up the specified number of fingers.
              </p>

              <div className="border-4 border-black bg-bg p-6 text-center">
                <span className="font-pixel text-[9px] text-muted block mb-2">REQUIRED GESTURE</span>
                <span className="font-pixel text-2xl text-accent block">
                  HOLD UP {fingerCount} FINGER{fingerCount > 1 ? 'S' : ''} 🖐️
                </span>
              </div>

              <div className="flex flex-col items-center gap-4">
                {selfiePreview ? (
                  <div className="relative w-48 h-48 border-4 border-black bg-secondary p-1 shadow-pixel-sm">
                    <img src={selfiePreview} alt="Selfie preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => { setSelfieFile(null); setSelfiePreview(''); }}
                      className="absolute top-2 right-2 bg-[#f43f5e] border-2 border-black text-white font-pixel text-[8px] px-2 py-1 cursor-pointer"
                    >
                      RETIRING
                    </button>
                  </div>
                ) : (
                  <label className="w-full py-8 border-4 border-dashed border-muted hover:border-white bg-surface flex flex-col items-center justify-center cursor-pointer">
                    <Camera size={40} className="text-muted mb-2" />
                    <span className="font-pixel text-[10px] text-white mb-1">UPLOAD SELFIE PHOTO</span>
                    <span className="font-mono text-xs text-muted">Showing {fingerCount} finger{fingerCount > 1 ? 's' : ''} clearly</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelfieSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <PixelButton onClick={handleStep6Submit} variant="success" className="py-3 mt-4" disabled={loading || !selfieFile}>
                {loading ? 'SUBMITTING...' : 'SUBMIT SELFIE FOR REVIEW'}
              </PixelButton>
            </div>
          )}
        </PixelCard>
      </div>
    </div>
  );
};

export default RegisterPage;

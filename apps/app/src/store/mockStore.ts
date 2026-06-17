import { create } from 'zustand';
import type { User, UserPhoto, Interest, Match, ChatMessage } from '@bumbul/shared';

// Extends User to support client-side mock avatar and profile properties
export interface MockUser extends User {
  avatarEmoji: string;
  photosList: UserPhoto[];
  interestsList: Interest[];
  slug?: string;
  latitude?: number;
  longitude?: number;
  invite_code?: string;
}

interface MockStoreState {
  // Current User
  currentUser: MockUser | null;
  isAuthenticated: boolean;
  regStep: number;
  regData: any;
  inviteCode: string;
  referrals: string[];
  swipeQuota: {
    likes_today: number;
    super_likes_today: number;
    likes_limit: number;
    super_likes_limit: number;
  };

  // Swiping Queue
  swipeQueue: MockUser[];
  currentSwipeProfile: MockUser | null;
  historySwipes: { [key: number]: 'like' | 'pass' | 'super' };

  // Social & Chats
  matches: Match[];
  chatMessages: { [matchId: number]: ChatMessage[] };
  activeMatchId: number | null;

  // Actions
  login: (phoneNumber: string) => boolean;
  loginWithCookieData: (userData: any) => void;
  logout: () => void;
  updateRegistrationStep: (step: number, data: any) => void;
  completeRegistration: (finalData: any, photos: string[]) => void;
  updateProfile: (updatedFields: Partial<MockUser>) => void;
  reorderPhotos: (orders: { id: number; order: number }[]) => void;
  deletePhoto: (photoId: number) => void;
  addPhoto: (imageBlobUrl: string) => void;
  swipeAction: (profileId: number, type: 'like' | 'pass' | 'super') => { matchCreated: boolean; matchId?: number };
  sendMessage: (matchId: number, content: string) => void;
  addReferral: (code: string) => void;
}

// Initial Mock Interest List
export const MOCK_INTERESTS: Interest[] = [
  { id: 1, name: 'Gaming', slug: 'gaming', created_at: new Date().toISOString() },
  { id: 2, name: 'Anime', slug: 'anime', created_at: new Date().toISOString() },
  { id: 3, name: 'Coding', slug: 'coding', created_at: new Date().toISOString() },
  { id: 4, name: 'Coffee', slug: 'coffee', created_at: new Date().toISOString() },
  { id: 5, name: 'Music', slug: 'music', created_at: new Date().toISOString() },
  { id: 6, name: 'Boardgames', slug: 'boardgames', created_at: new Date().toISOString() },
  { id: 7, name: 'Photography', slug: 'photography', created_at: new Date().toISOString() },
  { id: 8, name: 'Camping', slug: 'camping', created_at: new Date().toISOString() },
];

// Initial Swipable Profiles
const INITIAL_PROFILES: MockUser[] = [
  {
    id: 101,
    phone_number: '+989123456701',
    first_name: 'Elnaz',
    last_name: 'Ahmadi',
    full_name: 'Elnaz Ahmadi',
    gender: 'F',
    age: 22,
    date_of_birth: '2004-03-12',
    city_lives: 'shiraz',
    city_birth: 'shiraz',
    biography: 'Looking for a co-op partner in life. Anime lover, casual gamer, and pizza critic. Let\'s beat some highscores! 🎮✨',
    height_cm: 165,
    fun_question: 'My secret power is...',
    fun_answer: 'Making instant noodles taste like a gourmet meal.',
    membership: 'bronze',
    is_membership_active: false,
    profile_complete: true,
    is_active: true,
    date_joined: new Date().toISOString(),
    avatarEmoji: '👩‍💻',
    interestsList: [MOCK_INTERESTS[0], MOCK_INTERESTS[1], MOCK_INTERESTS[3]],
    photosList: [
      { id: 1, image_url: '👩‍💻', thumbnail_url: '👩‍💻', order: 0, is_primary: true, uploaded_at: new Date().toISOString() },
      { id: 2, image_url: '🍕', thumbnail_url: '🍕', order: 1, is_primary: false, uploaded_at: new Date().toISOString() },
      { id: 3, image_url: '🎮', thumbnail_url: '🎮', order: 2, is_primary: false, uploaded_at: new Date().toISOString() },
    ]
  },
  {
    id: 102,
    phone_number: '+989123456702',
    first_name: 'Sara',
    last_name: 'Karimi',
    full_name: 'Sara Karimi',
    gender: 'F',
    age: 24,
    date_of_birth: '2002-07-22',
    city_lives: 'isfahan',
    city_birth: 'tehran',
    biography: 'Photographer and visual designer. I capture moments before they fade away. Let\'s explore the historic alleys of Isfahan together. 📸🎨',
    height_cm: 168,
    fun_question: 'Dream travel destination?',
    fun_answer: 'A small cabin in the woods of Gorgan under the rain.',
    membership: 'silver',
    is_membership_active: true,
    membership_days_remaining: 15,
    profile_complete: true,
    is_active: true,
    date_joined: new Date().toISOString(),
    avatarEmoji: '🎨',
    interestsList: [MOCK_INTERESTS[4], MOCK_INTERESTS[6], MOCK_INTERESTS[7]],
    photosList: [
      { id: 4, image_url: '🎨', thumbnail_url: '🎨', order: 0, is_primary: true, uploaded_at: new Date().toISOString() },
      { id: 5, image_url: '📷', thumbnail_url: '📷', order: 1, is_primary: false, uploaded_at: new Date().toISOString() },
      { id: 6, image_url: '🐱', thumbnail_url: '🐱', order: 2, is_primary: false, uploaded_at: new Date().toISOString() },
    ]
  },
  {
    id: 103,
    phone_number: '+989123456703',
    first_name: 'Niloofar',
    last_name: 'Hosseini',
    full_name: 'Niloofar Hosseini',
    gender: 'F',
    age: 23,
    date_of_birth: '2003-11-02',
    city_lives: 'shiraz',
    city_birth: 'shiraz',
    biography: 'Books, tea, and warm sweaters. I spend my weekends reading classical literature or watching indie movies. Looking for deep conversations.',
    height_cm: 160,
    fun_question: 'First thing I look for in a person...',
    fun_answer: 'Their favorite book or movie director.',
    membership: 'gold',
    is_membership_active: true,
    membership_days_remaining: 28,
    profile_complete: true,
    is_active: true,
    date_joined: new Date().toISOString(),
    avatarEmoji: '📚',
    interestsList: [MOCK_INTERESTS[3], MOCK_INTERESTS[4], MOCK_INTERESTS[6]],
    photosList: [
      { id: 7, image_url: '📚', thumbnail_url: '📚', order: 0, is_primary: true, uploaded_at: new Date().toISOString() },
      { id: 8, image_url: '🍵', thumbnail_url: '🍵', order: 1, is_primary: false, uploaded_at: new Date().toISOString() },
      { id: 9, image_url: '🍁', thumbnail_url: '🍁', order: 2, is_primary: false, uploaded_at: new Date().toISOString() },
    ]
  },
  {
    id: 104,
    phone_number: '+989123456704',
    first_name: 'Mahdi',
    last_name: 'Rezaei',
    full_name: 'Mahdi Rezaei',
    gender: 'M',
    age: 25,
    date_of_birth: '2001-05-18',
    city_lives: 'tehran',
    city_birth: 'isfahan',
    biography: 'Full stack developer who drinks too much coffee. I build things with code and break them for fun. Let\'s talk startups or gaming. ☕💻',
    height_cm: 182,
    fun_question: 'Tabs or spaces?',
    fun_answer: 'Tabs. Don\'t fight me on this.',
    membership: 'bronze',
    is_membership_active: false,
    profile_complete: true,
    is_active: true,
    date_joined: new Date().toISOString(),
    avatarEmoji: '👨‍💻',
    interestsList: [MOCK_INTERESTS[0], MOCK_INTERESTS[2], MOCK_INTERESTS[3]],
    photosList: [
      { id: 10, image_url: '👨‍💻', thumbnail_url: '👨‍💻', order: 0, is_primary: true, uploaded_at: new Date().toISOString() },
      { id: 11, image_url: '☕', thumbnail_url: '☕', order: 1, is_primary: false, uploaded_at: new Date().toISOString() },
      { id: 12, image_url: '⌨️', thumbnail_url: '⌨️', order: 2, is_primary: false, uploaded_at: new Date().toISOString() },
    ]
  },
  {
    id: 105,
    phone_number: '+989123456705',
    first_name: 'Arash',
    last_name: 'Rad',
    full_name: 'Arash Rad',
    gender: 'M',
    age: 27,
    date_of_birth: '1999-01-30',
    city_lives: 'gorgan',
    city_birth: 'gorgan',
    biography: 'Nature boy. Weekend camper, mountain climber, and dog shelter volunteer. If you love fresh air and stargazing, we will get along. 🏕️🐕',
    height_cm: 178,
    fun_question: 'Weekend plan?',
    fun_answer: 'Camping in Alangdareh forest and making fire tea.',
    membership: 'silver',
    is_membership_active: true,
    membership_days_remaining: 8,
    profile_complete: true,
    is_active: true,
    date_joined: new Date().toISOString(),
    avatarEmoji: '🏕️',
    interestsList: [MOCK_INTERESTS[5], MOCK_INTERESTS[7]],
    photosList: [
      { id: 13, image_url: '🏕️', thumbnail_url: '🏕️', order: 0, is_primary: true, uploaded_at: new Date().toISOString() },
      { id: 14, image_url: '🐶', thumbnail_url: '🐶', order: 1, is_primary: false, uploaded_at: new Date().toISOString() },
      { id: 15, image_url: '🔥', thumbnail_url: '🔥', order: 2, is_primary: false, uploaded_at: new Date().toISOString() },
    ]
  }
];

export const useMockStore = create<MockStoreState>((set, get) => ({
  // State
  currentUser: null,
  isAuthenticated: false,
  regStep: 1,
  regData: {},
  inviteCode: 'BMBL88',
  referrals: ['USER_NIMA', 'USER_SAMAN'],
  swipeQuota: {
    likes_today: 0,
    super_likes_today: 0,
    likes_limit: 50,
    super_likes_limit: 1
  },

  swipeQueue: INITIAL_PROFILES,
  currentSwipeProfile: INITIAL_PROFILES[0] || null,
  historySwipes: {},

  matches: [],
  chatMessages: {},
  activeMatchId: null,

  // Actions
  login: (phoneNumber: string) => {
    // Basic auto-login for demonstration
    const normalized = phoneNumber.startsWith('09') ? '+98' + phoneNumber.slice(1) : phoneNumber;
    
    // Check if the user is logging in as one of the mock accounts (for testing) or default
    const isMockMale = normalized.includes('104') || normalized.includes('105');
    
    const user: MockUser = {
      id: 999,
      phone_number: normalized,
      first_name: 'Amir',
      last_name: 'Dehghani',
      full_name: 'Amir Dehghani',
      gender: isMockMockUserGender(isMockMale),
      age: 26,
      date_of_birth: '2000-05-15',
      city_lives: 'tehran',
      city_birth: 'shiraz',
      biography: 'Building beautiful websites and sipping tea. Let\'s explore some pixel art. 🎮☕',
      height_cm: 180,
      fun_question: 'What is your favorite game?',
      fun_answer: 'Chrono Trigger and Stardew Valley!',
      membership: 'bronze',
      is_membership_active: false,
      profile_complete: true,
      is_active: true,
      date_joined: new Date().toISOString(),
      avatarEmoji: '🧔',
      interestsList: [MOCK_INTERESTS[0], MOCK_INTERESTS[2], MOCK_INTERESTS[3]],
      photosList: [
        { id: 9991, image_url: '🧔', thumbnail_url: '🧔', order: 0, is_primary: true, uploaded_at: new Date().toISOString() },
        { id: 9992, image_url: '💻', thumbnail_url: '💻', order: 1, is_primary: false, uploaded_at: new Date().toISOString() },
        { id: 9993, image_url: '☕', thumbnail_url: '☕', order: 2, is_primary: false, uploaded_at: new Date().toISOString() },
      ]
    };

    set({ currentUser: user, isAuthenticated: true });
    
    if (typeof document !== 'undefined') {
      document.cookie = `mock_logged_in=true; path=/; max-age=86400`;
      document.cookie = `mock_phone_number=${encodeURIComponent(normalized)}; path=/; max-age=86400`;
      document.cookie = "mock_user_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    
    // Filter swipe queue to show opposite gender
    const filteredQueue = INITIAL_PROFILES.filter(p => p.gender !== user.gender);
    set({
      swipeQueue: filteredQueue,
      currentSwipeProfile: filteredQueue[0] || null
    });

    return true;
  },

  loginWithCookieData: (userData: any) => {
    const photosList: UserPhoto[] = (userData.photos || []).map((url: string, index: number) => ({
      id: 8880 + index,
      image_url: url,
      thumbnail_url: url,
      order: index,
      is_primary: index === 0,
      uploaded_at: new Date().toISOString()
    }));

    const selectedInterests = (userData.interests || []).map((idStr: string) => {
      const id = parseInt(idStr, 10);
      return MOCK_INTERESTS.find(i => i.id === id);
    }).filter(Boolean);

    const newUser: MockUser = {
      id: 999,
      phone_number: userData.phone_number || '+989123456789',
      first_name: userData.first_name || 'New User',
      last_name: userData.last_name || '',
      full_name: `${userData.first_name || 'New'} ${userData.last_name || 'User'}`.trim(),
      gender: userData.gender || 'M',
      age: 26,
      date_of_birth: userData.date_of_birth || '2000-01-01',
      city_lives: userData.city_lives || 'tehran',
      city_birth: userData.city_birth || 'tehran',
      biography: userData.biography || 'New to Bumbul!',
      height_cm: parseInt(userData.height_cm, 10) || 175,
      fun_question: userData.fun_question || '',
      fun_answer: userData.fun_answer || '',
      membership: 'bronze',
      is_membership_active: false,
      profile_complete: true,
      is_active: true,
      date_joined: new Date().toISOString(),
      avatarEmoji: userData.gender === 'F' ? '👩' : '🧔',
      interestsList: selectedInterests,
      photosList: photosList
    };

    set({
      currentUser: newUser,
      isAuthenticated: true
    });

    const filteredQueue = INITIAL_PROFILES.filter(p => p.gender !== newUser.gender);
    set({
      swipeQueue: filteredQueue,
      currentSwipeProfile: filteredQueue[0] || null
    });
  },

  logout: () => {
    if (typeof document !== 'undefined') {
      document.cookie = "mock_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "mock_user_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "mock_phone_number=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    set({ currentUser: null, isAuthenticated: false, matches: [], chatMessages: {}, activeMatchId: null });
  },

  updateRegistrationStep: (step: number, data: any) => {
    set((state) => ({
      regStep: step,
      regData: { ...state.regData, ...data }
    }));
  },

  completeRegistration: (finalData: any, photos: string[]) => {
    const state = get();
    const allData = { ...state.regData, ...finalData };
    
    const photosList: UserPhoto[] = photos.map((url, index) => ({
      id: 8880 + index,
      image_url: url,
      thumbnail_url: url,
      order: index,
      is_primary: index === 0,
      uploaded_at: new Date().toISOString()
    }));

    // Auto-map selected interest IDs to full interest objects
    const selectedInterests = (allData.interests || []).map((idStr: string) => {
      const id = parseInt(idStr, 10);
      return MOCK_INTERESTS.find(i => i.id === id);
    }).filter(Boolean);

    const newUser: MockUser = {
      id: 999,
      phone_number: state.regData.phone_number || '+989123456789',
      first_name: allData.first_name || 'New User',
      last_name: allData.last_name || '',
      full_name: `${allData.first_name || 'New'} ${allData.last_name || 'User'}`.trim(),
      gender: allData.gender || 'M',
      age: calculateAge(allData.date_of_birth),
      date_of_birth: allData.date_of_birth,
      city_lives: allData.city_lives || 'tehran',
      city_birth: allData.city_birth || 'tehran',
      biography: allData.biography || 'New to Bumbul!',
      height_cm: parseInt(allData.height_cm, 10) || 175,
      fun_question: allData.fun_question || '',
      fun_answer: allData.fun_answer || '',
      membership: 'bronze',
      is_membership_active: false,
      profile_complete: true,
      is_active: true,
      date_joined: new Date().toISOString(),
      avatarEmoji: allData.gender === 'F' ? '👩' : '🧔',
      interestsList: selectedInterests,
      photosList: photosList
    };

    set({
      currentUser: newUser,
      isAuthenticated: true,
      regStep: 1,
      regData: {}
    });

    if (typeof document !== 'undefined') {
      const userData = {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        phone_number: newUser.phone_number,
        gender: newUser.gender,
        biography: newUser.biography,
        height_cm: newUser.height_cm,
        city_lives: newUser.city_lives,
        city_birth: newUser.city_birth,
        interests: (allData.interests || []),
        fun_question: newUser.fun_question,
        fun_answer: newUser.fun_answer,
        photos: photos
      };
      document.cookie = `mock_logged_in=true; path=/; max-age=86400`;
      document.cookie = `mock_user_data=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400`;
    }

    // Reset swipe queue based on gender
    const filteredQueue = INITIAL_PROFILES.filter(p => p.gender !== newUser.gender);
    set({
      swipeQueue: filteredQueue,
      currentSwipeProfile: filteredQueue[0] || null
    });
  },

  updateProfile: (updatedFields: Partial<MockUser>) => {
    set((state) => {
      if (!state.currentUser) return {};
      const updatedUser = { ...state.currentUser, ...updatedFields };
      updatedUser.full_name = `${updatedUser.first_name} ${updatedUser.last_name || ''}`.trim();
      if (updatedFields.date_of_birth) {
        updatedUser.age = calculateAge(updatedFields.date_of_birth);
      }
      return { currentUser: updatedUser };
    });
  },

  reorderPhotos: (orders: { id: number; order: number }[]) => {
    set((state) => {
      if (!state.currentUser) return {};
      const photos = [...state.currentUser.photosList];
      const reordered = photos.map(p => {
        const orderItem = orders.find(o => o.id === p.id);
        if (orderItem) {
          return { ...p, order: orderItem.order };
        }
        return p;
      }).sort((a, b) => a.order - b.order);

      // Re-assign primary photo to the first one in sorted list
      const updatedPhotos = reordered.map((p, idx) => ({
        ...p,
        order: idx,
        is_primary: idx === 0
      }));

      return {
        currentUser: { ...state.currentUser, photosList: updatedPhotos }
      };
    });
  },

  deletePhoto: (photoId: number) => {
    set((state) => {
      if (!state.currentUser) return {};
      const photos = state.currentUser.photosList.filter(p => p.id !== photoId);
      // Re-index remaining photos
      const updatedPhotos = photos.map((p, idx) => ({
        ...p,
        order: idx,
        is_primary: idx === 0
      }));
      return {
        currentUser: { ...state.currentUser, photosList: updatedPhotos }
      };
    });
  },

  addPhoto: (imageBlobUrl: string) => {
    set((state) => {
      if (!state.currentUser) return {};
      const newPhoto: UserPhoto = {
        id: Date.now(),
        image_url: imageBlobUrl,
        thumbnail_url: imageBlobUrl,
        order: state.currentUser.photosList.length,
        is_primary: state.currentUser.photosList.length === 0,
        uploaded_at: new Date().toISOString()
      };
      return {
        currentUser: {
          ...state.currentUser,
          photosList: [...state.currentUser.photosList, newPhoto]
        }
      };
    });
  },

  swipeAction: (profileId: number, type: 'like' | 'pass' | 'super') => {
    const state = get();
    const swipedUser = state.swipeQueue.find(p => p.id === profileId);
    
    if (!swipedUser) return { matchCreated: false };

    // Update history and quota
    const newHistory = { ...state.historySwipes, [profileId]: type };
    const newQueue = state.swipeQueue.filter(p => p.id !== profileId);
    
    const quotaUpdate = { ...state.swipeQuota };
    if (type === 'like') quotaUpdate.likes_today += 1;
    if (type === 'super') quotaUpdate.super_likes_today += 1;

    set({
      historySwipes: newHistory,
      swipeQueue: newQueue,
      currentSwipeProfile: newQueue[0] || null,
      swipeQuota: quotaUpdate
    });

    // Simulated 60% chance of match on Like/Super Like
    const isLike = type === 'like' || type === 'super';
    const matchCreated = isLike && Math.random() < 0.6;

    if (matchCreated && state.currentUser) {
      const matchId = Date.now();
      const newMatch: Match = {
        id: matchId,
        user1: state.currentUser,
        user2: swipedUser,
        created_at: new Date().toISOString()
      };

      // Create initial conversation
      const welcomeMessages: ChatMessage[] = [
        {
          id: Date.now(),
          match_id: matchId,
          sender_id: swipedUser.id,
          content: `Hey! I matched with you! What are you playing lately? 🕹️`,
          timestamp: new Date().toISOString(),
          is_read: false
        }
      ];

      set({
        matches: [newMatch, ...state.matches],
        chatMessages: {
          ...state.chatMessages,
          [matchId]: welcomeMessages
        }
      });

      return { matchCreated: true, matchId };
    }

    return { matchCreated: false };
  },

  sendMessage: (matchId: number, content: string) => {
    const state = get();
    if (!state.currentUser) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      match_id: matchId,
      sender_id: state.currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      is_read: true
    };

    const currentMsgs = state.chatMessages[matchId] || [];
    const updatedMsgs = [...currentMsgs, userMessage];

    set({
      chatMessages: {
        ...state.chatMessages,
        [matchId]: updatedMsgs
      }
    });

    // Auto-respond with a mock message after 1.5 seconds
    setTimeout(() => {
      const activeMatch = state.matches.find(m => m.id === matchId);
      if (!activeMatch) return;
      const partner = activeMatch.user2 as MockUser;

      const responses = [
        "Haha, that sounds amazing! Pixel art rocks 👾",
        "Indeed. Let's hang out sometime and play Stardew Valley!",
        "Yes, Shiraz is lovely. Where do you usually go for tea?",
        "I totally agree. I read that book too!",
        "Nice! What other programming languages do you know? 💻"
      ];

      const partnerMessage: ChatMessage = {
        id: Date.now() + 1,
        match_id: matchId,
        sender_id: partner.id,
        content: responses[Math.floor(Math.random() * responses.length)] || "That's cool!",
        timestamp: new Date().toISOString(),
        is_read: false
      };

      set((currState) => ({
        chatMessages: {
          ...currState.chatMessages,
          [matchId]: [...(currState.chatMessages[matchId] || []), partnerMessage]
        }
      }));
    }, 1500);
  },

  addReferral: (code: string) => {
    set((state) => {
      if (state.referrals.includes(code)) return {};
      
      // Upgrade membership to silver if referral count reaches 3
      const updatedReferrals = [...state.referrals, code];
      let updatedMembership = state.currentUser?.membership || 'bronze';
      
      if (updatedReferrals.length >= 3 && updatedMembership === 'bronze') {
        updatedMembership = 'silver';
      }

      const updatedUser = state.currentUser
        ? { ...state.currentUser, membership: updatedMembership }
        : null;

      const quotaUpdate = { ...state.swipeQuota };
      if (updatedMembership === 'silver') {
        quotaUpdate.likes_limit = 150;
        quotaUpdate.super_likes_limit = 3;
      }

      return {
        referrals: updatedReferrals,
        currentUser: updatedUser,
        swipeQuota: quotaUpdate
      };
    });
  }
}));

// Helper Functions
function isMockMockUserGender(isMockMale: boolean): 'M' | 'F' {
  return isMockMale ? 'M' : 'F';
}

function calculateAge(dobString: string): number {
  if (!dobString) return 25;
  const birthDate = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

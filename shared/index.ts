// Shared types and utilities for Bumbul Project

export interface User {
  id: number;
  phone_number: string;
  first_name: string;
  last_name?: string;
  full_name: string;
  gender?: 'M' | 'F';
  age?: number;
  date_of_birth?: string;
  city_lives?: string;
  city_birth?: string;
  biography?: string;
  height_cm?: number;
  fun_question?: string;
  fun_answer?: string;
  membership: 'bronze' | 'silver' | 'gold';
  membership_expiry?: string;
  is_membership_active: boolean;
  membership_days_remaining?: number;
  profile_complete: boolean;
  is_active: boolean;
  date_joined: string;
  last_login?: string;
  slug?: string;
  latitude?: number;
  longitude?: number;
  invite_code?: string;
}

export interface UserPhoto {
  id: number;
  image_url: string;
  thumbnail_url: string;
  order: number;
  is_primary: boolean;
  uploaded_at: string;
}

export interface Interest {
  id: number;
  name: string;
  slug: string;
  user_count?: number;
  created_at: string;
}

export interface Swipe {
  id: number;
  swiper_id: number;
  swiped_id: number;
  swipe_type: 'like' | 'pass' | 'super';
  created_at: string;
}

export interface Match {
  id: number;
  user1: User;
  user2: User;
  created_at: string;
}

export interface ChatMessage {
  id: number;
  match_id: number;
  sender_id: number;
  content: string;
  timestamp: string;
  is_read: boolean;
}

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

export interface EventParticipant {
  id: number;
  user: User;
  status: 'attending' | 'waitlist' | 'cancelled';
  joined_at: string;
  updated_at: string;
}

export interface EventMessage {
  id: number;
  sender: User;
  content: string;
  timestamp: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  city: string;
  area_label: string;
  date_time: string;
  ends_at?: string;
  join_deadline?: string;
  capacity: number;
  current_participants: number;
  waitlist_count: number;
  spots_left: number;
  is_full: boolean;
  join_is_open: boolean;
  image?: string;
  created_by: User;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // User context fields
  is_joined: boolean;
  is_waitlisted: boolean;
  can_join: boolean;
  can_leave: boolean;
  starts_in: string;
  // Private details (visible only to registered participants)
  full_address?: string;
  location_details?: string;
  participants?: EventParticipant[];
  messages?: EventMessage[];
}


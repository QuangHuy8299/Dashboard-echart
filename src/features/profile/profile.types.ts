export type UserRole = 'admin' | 'user';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;
  role: UserRole;
  language: 'en' | 'es' | 'fr' | 'de';
  timezone: string;
  joinedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  defaultView: 'overview' | 'analytics';
}

export interface ActivityLog {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
}

export interface SessionInfo {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface ProfileState {
  data: UserProfile | null;
  preferences: UserPreferences;
  activities: ActivityLog[];
  sessions: SessionInfo[];
  isLoading: boolean;
  error: string | null;
}

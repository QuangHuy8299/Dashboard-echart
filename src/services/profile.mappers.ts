import type {
  UserProfile,
  UserPreferences,
  ActivityLog,
  SessionInfo,
} from '@/features/profile/profile.types';

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
    title: string;
  };
  image: string;
}

export interface DummyUsersResponse {
  users: DummyUser[];
  total: number;
}

export function mapDummyUserToProfile(user: DummyUser): UserProfile {
  return {
    id: `u-${user.id}`,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phoneNumber: user.phone,
    avatarUrl: user.image,
    role: user.id % 5 === 0 ? 'admin' : 'user',
    language: 'en',
    timezone: 'UTC',
    joinedAt: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    ).toISOString(),
  };
}

export function generateUserPreferences(): UserPreferences {
  return {
    theme: 'system',
    emailNotifications: true,
    pushNotifications: false,
    defaultView: 'overview',
  };
}

export function generateActivityLogs(user: DummyUser): ActivityLog[] {
  const actions = [
    'Login',
    'Update Profile',
    'Change Password',
    'Download Report',
    'Export Data',
  ];
  const targets = ['System', 'Profile', 'Security', 'Dashboard', 'Database'];

  const logs: ActivityLog[] = [];
  const now = Date.now();

  for (let i = 0; i < 5; i++) {
    const timeAgo = Math.random() * 30 * 24 * 60 * 60 * 1000; // Last 30 days
    const timestamp = new Date(now - timeAgo).toISOString();
    const action = actions[Math.floor(Math.random() * actions.length)];
    const target = targets[Math.floor(Math.random() * targets.length)];

    logs.push({
      id: `a-${user.id}-${i}`,
      action,
      target,
      timestamp,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}`,
    });
  }

  return logs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function generateSessionInfo(user: DummyUser): SessionInfo[] {
  const devices = [
    'Chrome on Windows',
    'Safari on MacOS',
    'Chrome Mobile on Android',
    'Safari on iOS',
    'Firefox on Linux',
  ];
  const locations = [
    'New York, USA',
    'San Francisco, USA',
    'London, UK',
    'Tokyo, Japan',
    'Sydney, Australia',
  ];

  const sessions: SessionInfo[] = [];

  for (let i = 0; i < 3; i++) {
    const daysAgo = i === 0 ? 0 : Math.floor(Math.random() * 30) + 1;
    const lastActive =
      daysAgo === 0
        ? 'Just now'
        : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;

    sessions.push({
      id: `s-${user.id}-${i}`,
      device: devices[i % devices.length],
      location: locations[i % locations.length],
      lastActive,
      isCurrent: i === 0,
    });
  }

  return sessions;
}

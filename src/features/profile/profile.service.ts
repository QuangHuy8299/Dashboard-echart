import type { ProfileState, UserProfile } from './profile.types';

const MOCK_PROFILE: UserProfile = {
  id: 'u-123',
  fullName: 'Admin User',
  email: 'admin@enterprise.com',
  phoneNumber: '+1 (555) 123-4567',
  avatarUrl: 'https://github.com/shadcn.png',
  role: 'admin',
  language: 'en',
  timezone: 'UTC-5',
  joinedAt: '2023-01-15T10:00:00Z',
};

const MOCK_ACTIVITIES = [
  {
    id: '1',
    action: 'Login',
    target: 'System',
    timestamp: new Date().toISOString(),
    ipAddress: '192.168.1.1',
  },
  {
    id: '2',
    action: 'Update Settings',
    target: 'Global Config',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    ipAddress: '192.168.1.1',
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const profileService = {
  fetchProfile: async (): Promise<Partial<ProfileState>> => {
    await sleep(800);
    return {
      data: MOCK_PROFILE,
      preferences: {
        theme: 'system',
        emailNotifications: true,
        pushNotifications: false,
        defaultView: 'overview',
      },
      activities: MOCK_ACTIVITIES,
      sessions: [
        {
          id: 's-1',
          device: 'Chrome on MacOS',
          location: 'New York, USA',
          lastActive: 'Just now',
          isCurrent: true,
        },
        {
          id: 's-2',
          device: 'Mobile App',
          location: 'New York, USA',
          lastActive: '2 days ago',
          isCurrent: false,
        },
      ],
    };
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    await sleep(500);
    return { ...MOCK_PROFILE, ...data };
  },
};

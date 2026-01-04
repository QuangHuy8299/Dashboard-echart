import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProfileState, UserPreferences } from './profile.types';

const initialState: ProfileState = {
  data: null,
  preferences: {
    theme: 'system',
    emailNotifications: true,
    pushNotifications: false,
    defaultView: 'overview',
  },
  activities: [],
  sessions: [],
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updatePreferences: (
      state,
      action: PayloadAction<Partial<UserPreferences>>
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearProfile: (state) => {
      state.data = null;
    },
  },
});

export const { updatePreferences, clearProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { profileService } from './profile.service';
import type { ProfileState, UserPreferences } from './profile.types';

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await profileService.fetchProfile();
    } catch (error) {
      return rejectWithValue(`Failed to fetch profile data, ${error}`);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data) state.data = action.payload.data;
        if (action.payload.preferences)
          state.preferences = action.payload.preferences;
        if (action.payload.activities)
          state.activities = action.payload.activities;
        if (action.payload.sessions) state.sessions = action.payload.sessions;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updatePreferences, clearProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AnalyticsFilters {
  dateRangeStart: string | null;
  dateRangeEnd: string | null;
  selectedRegion: string | null;
  selectedCategory: string | null;
  selectedSegment: string | null;
  sortBy: 'revenue' | 'orders' | 'growth';
  sortOrder: 'asc' | 'desc';
}

const initialState: AnalyticsFilters = {
  dateRangeStart: null,
  dateRangeEnd: null,
  selectedRegion: null,
  selectedCategory: null,
  selectedSegment: null,
  sortBy: 'revenue',
  sortOrder: 'desc',
};

const analyticsFiltersSlice = createSlice({
  name: 'analyticsFilters',
  initialState,
  reducers: {
    setDateRange: (
      state,
      action: PayloadAction<{ start: string; end: string }>
    ) => {
      state.dateRangeStart = action.payload.start;
      state.dateRangeEnd = action.payload.end;
    },
    clearDateRange: (state) => {
      state.dateRangeStart = null;
      state.dateRangeEnd = null;
    },
    setSelectedRegion: (state, action: PayloadAction<string | null>) => {
      state.selectedRegion = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSegment: (state, action: PayloadAction<string | null>) => {
      state.selectedSegment = action.payload;
    },
    setSorting: (
      state,
      action: PayloadAction<{
        sortBy: 'revenue' | 'orders' | 'growth';
        sortOrder: 'asc' | 'desc';
      }>
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setDateRange,
  clearDateRange,
  setSelectedRegion,
  setSelectedCategory,
  setSelectedSegment,
  setSorting,
  resetFilters,
} = analyticsFiltersSlice.actions;

export const analyticsFiltersReducer = analyticsFiltersSlice.reducer;

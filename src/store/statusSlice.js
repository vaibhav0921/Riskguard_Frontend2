import { createSlice } from '@reduxjs/toolkit';

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    eaData:      null,
    rules:       null,
    eaConnected: false,
    lastSync:    null,
    loading:     true,
    error:       '',
  },
  reducers: {
    setEAData(state, action) {
      state.eaData      = action.payload;
      state.eaConnected = true;
      state.loading     = false;
      state.error       = '';
      state.lastSync    = new Date().toISOString();
    },
    setEADisconnected(state) {
      // DO NOT wipe eaData — keep last known values visible
      state.eaConnected = false;
      state.loading     = false;
      state.lastSync    = new Date().toISOString();
    },
    setRules(state, action) {
      state.rules = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error   = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setEAData,
  setEADisconnected,
  setRules,
  setLoading,
  setError,
} = statusSlice.actions;

export default statusSlice.reducer;

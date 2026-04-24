import { createSlice } from '@reduxjs/toolkit';

const saved = () => {
  try {
    const data = JSON.parse(localStorage.getItem('rg_user'));
    // Must have both email and account to be valid
    if (!data?.email || !data?.account) return null;
    return data;
  } catch {
    return null;
  }
};

const savedSub = () => {
  try {
    const data = JSON.parse(localStorage.getItem('rg_sub'));
    // Must have expiryDate to be valid
    if (!data?.expiryDate) return null;
    return data;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:         saved(),
    subscription: savedSub(),
  },
  reducers: {
    loginAction(state, action) {
      state.user = action.payload;
      localStorage.setItem('rg_user', JSON.stringify(action.payload));
    },
    logoutAction(state) {
      state.user         = null;
      state.subscription = null;
      localStorage.removeItem('rg_user');
      localStorage.removeItem('rg_sub');
    },
    setSubscription(state, action) {
      state.subscription = action.payload;
      localStorage.setItem('rg_sub', JSON.stringify(action.payload));
    },
  },
});

export const { loginAction, logoutAction, setSubscription } = authSlice.actions;
export default authSlice.reducer;
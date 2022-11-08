import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import spotifyReducer from '../features/spotify/spotifySlice';

// Entire state of the application
export const store = configureStore({
  reducer: {
    auth: authReducer,
    spotify: spotifyReducer
  }
});
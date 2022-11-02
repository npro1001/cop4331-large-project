import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import spotifyAuthReducer from '../auth/spotifyAuthSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    spotifyAuth: spotifyAuthReducer
  }
});
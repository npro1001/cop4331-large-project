import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import spotifyReducer from '../features/spotify/spotifySlice';
import postReducer from '../features/post/postSlice';

// Entire state of the application
// const persistedState = localStorage.getItem('user') 
//                        ? JSON.parse(localStorage.getItem('user'))
//                        : {}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spotify: spotifyReducer,
    post: postReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
  // persistedState,
});

// store.subscribe(()=>{
//   localStorage.setItem('user', JSON.stringify(store.auth)) //! Dont do store.auth.user
// })
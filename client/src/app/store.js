import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import authReducer, { updateUser, followUser, unfollowUser, uploadPFP } from '../features/auth/authSlice';
import spotifyReducer from '../features/spotify/spotifySlice';
import postReducer from '../features/post/postSlice';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(updateUser, followUser, unfollowUser, uploadPFP),
  effect: async (matcher, listenerApi) =>
    localStorage.setItem("user", JSON.stringify(listenerApi.getState().auth.user))
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spotify: spotifyReducer,
    post: postReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
  middleware: (getDefaultMiddleware) => [
    listenerMiddleware.middleware,
    ...getDefaultMiddleware({serializableCheck: false})] //?
  });

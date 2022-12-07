import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import authReducer, { updateUser, followUser, unfollowUser, uploadPFP, putTopArtist } from '../features/auth/authSlice';
import spotifyReducer from '../features/spotify/spotifySlice';
import postReducer, {deletePost} from '../features/post/postSlice';

export const userListenerMiddleware = createListenerMiddleware();
userListenerMiddleware.startListening({
  matcher: isAnyOf(updateUser, followUser, unfollowUser, uploadPFP, putTopArtist, deletePost),
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
    userListenerMiddleware.middleware,
    ...getDefaultMiddleware({serializableCheck: false})] //?
  });

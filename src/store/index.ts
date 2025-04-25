import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';
import createWebSocketMiddleware from './middleware/websocketMiddleware';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(createWebSocketMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
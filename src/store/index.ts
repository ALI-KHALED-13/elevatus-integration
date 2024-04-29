import { configureStore } from '@reduxjs/toolkit/react';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jobsApi } from './services/jobsApi';

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

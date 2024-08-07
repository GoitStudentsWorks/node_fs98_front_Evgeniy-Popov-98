import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice.js';
import { timerReducer } from './timer/slice.js';
import { waterReducer } from './water/slice.js';
import { calendarReducer } from './calendar/slice.js';
import { refreshSettingInterceptors } from './auth/operations.js';

const authPeristConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'isLoggedIn'],
};

export const store = configureStore({
  reducer: {
    water: waterReducer,
    auth: persistReducer(authPeristConfig, authReducer),
    countDownTimer: timerReducer,
    calendar: calendarReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

refreshSettingInterceptors(store);

export const persistor = persistStore(store);

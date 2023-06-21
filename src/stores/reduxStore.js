import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';

export const store = configureStore({
  reducer: {
    key: '',
    user: userReducer,
  },
});


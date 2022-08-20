import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '.data/redux/reducers/user';


export const store = configureStore({
  reducer: {
    key: '',
    user: userReducer,
  },
});


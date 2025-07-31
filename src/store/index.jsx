import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/task/taskSlice';


// src/store/index.jsx
export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer, // Added task reducer
  },
});



 

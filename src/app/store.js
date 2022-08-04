import { configureStore } from '@reduxjs/toolkit';
import productoReducer from '../features/productos/productoSlice';

export const store = configureStore({
  reducer: {
    productos: productoReducer,
  },
})
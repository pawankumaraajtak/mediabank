import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './reducers/globalSlice';

export const store = configureStore({
    reducer: {
        global: globalSlice,
    },
});
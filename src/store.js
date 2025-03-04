// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './Routes/ticket-list/ticketsReducer';

const store = configureStore({
    reducer: {
        tickets: ticketsReducer,
    },
});

export default store;

// src/Routes/ticket-list/ticketsReducer.js
import { FETCH_TICKETS_SUCCESS, FETCH_TICKETS_FAILURE } from './ticketsAction';

const initialState = {
    tickets: [],
    error: '',
};

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                tickets: action.payload,
                error: '',
            };
        case FETCH_TICKETS_FAILURE:
            return {
                ...state,
                tickets: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ticketsReducer;

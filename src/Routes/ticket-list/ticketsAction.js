// src/Routes/ticket-list/ticketsAction.js
import axios from 'axios';

// Action Type
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';

// Action Creator for fetching all tickets
export const fetchAllTickets = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/tickets', {
            headers: { Authorization: `Bearer ${token}` },
        });

        // Dispatch success action with fetched tickets
        dispatch({
            type: FETCH_TICKETS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Failed to fetch tickets', error);

        // Dispatch failure action if fetching fails
        dispatch({
            type: FETCH_TICKETS_FAILURE,
            payload: 'Failed to fetch tickets. Please try again.',
        });
    }
};

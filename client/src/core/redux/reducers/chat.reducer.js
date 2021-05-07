import { FETCH_CHAT_REQUEST, FETCH_CHAT_SUCCEEDED, FETCH_CHAT_FAILURE, REMOVE_CHAT } from '../actions/types';
import { IDLE, SUCCEEDED, FAILURE, LOADING } from '../../constants/reducer.constants';


const initialState = {
    data: null,
    status: IDLE,
    error: null
};

const chatReducer = ( state=initialState, action ) => {
    switch( action.type ) {
        case FETCH_CHAT_REQUEST:
            return {
                ...state,
                status: LOADING,
                error: null
            };
        case FETCH_CHAT_SUCCEEDED:
            return {
                ...state,
                data: action.payload.data,
                status: SUCCEEDED,
                error: null
            };
        case FETCH_CHAT_FAILURE:
            return {
                ...state,
                status: FAILURE,
                error: action.payload.error
            };
        case REMOVE_CHAT:
            return {
                ...state,
                data: null,
                status: IDLE,
                error: null
            };
        default:
            return state;
    }
};

export default chatReducer;

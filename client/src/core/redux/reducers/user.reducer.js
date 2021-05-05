import { FETCH_USER_REQUEST, FETCH_USER_SUCCEEDED, FETCH_USER_FAILURE, SET_USER } from '../actions/types';
import { IDLE, SUCCEEDED, FAILURE, LOADING } from '../../constants/reducer.constants';

const initialState = {
    data: null,
    status: IDLE,
    error: null
};

const userReducer = ( state=initialState, action ) => {
    switch( action.type ) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                status: LOADING,
                error: null
            }
        case FETCH_USER_SUCCEEDED:
            return {
                ...state,
                data: action.payload.data,
                status: SUCCEEDED,
                error: null
            }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                status: FAILURE,
                error: action.payload.error
            }
        case SET_USER:
            return {
                ...state,
                data: action.payload.newUser
            }
        default:
            return state;
    }
};

export default userReducer;
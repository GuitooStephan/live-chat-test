import { SET_ACTIVE_USERS } from '../actions/types';


const initialState = {
    data: []
};

const activeUsersReducer = ( state=initialState, action ) => {
    switch( action.type ) {
        case SET_ACTIVE_USERS:
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state;
    }
};

export default activeUsersReducer;

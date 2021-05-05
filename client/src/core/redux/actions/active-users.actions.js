import { SET_ACTIVE_USERS } from './types';
import { getActiveUsers } from '../../services/user.service';

export const setActiveUsers = id => dispatch => {
    getActiveUsers( id ).then( res => {
        dispatch({
            type: SET_ACTIVE_USERS,
            payload: {
                data: res.data
            }
        });
    } );
};

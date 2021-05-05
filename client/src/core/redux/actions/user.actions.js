import { FETCH_USER_REQUEST, FETCH_USER_SUCCEEDED, FETCH_USER_FAILURE, SET_USER } from './types';
import { getProfile } from '../../services/user.service';

export const fetchUser = payload => dispatch => {
    dispatch({
        type: FETCH_USER_REQUEST
    });
    getProfile( payload ).then( res => {
        dispatch({
            type: FETCH_USER_SUCCEEDED,
            payload: {
                data: res.data
            }
        });
    } ).catch( error => {
        dispatch({
            type: FETCH_USER_FAILURE,
            payload: {
                error: error.message
            }
        });
    } );
};

export const setUser = newUser => dispatch => {
    dispatch({
        type: SET_USER,
        payload : {
            newUser
        }
    });
};

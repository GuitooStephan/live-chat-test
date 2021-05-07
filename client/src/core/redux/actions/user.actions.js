import { 
    FETCH_USER_REQUEST, FETCH_USER_SUCCEEDED, FETCH_USER_FAILURE,
    FETCH_UPDATED_USER_REQUEST, FETCH_UPDATED_USER_SUCCEEDED, FETCH_UPDATED_USER_FAILURE
} from './types';
import { getProfile, getUpdatedProfile } from '../../services/user.service';

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

export const getUpdatedUser = id => dispatch => {
    dispatch({
        type: FETCH_UPDATED_USER_REQUEST
    });
    getUpdatedProfile( id ).then( res => {
        dispatch({
            type: FETCH_UPDATED_USER_SUCCEEDED,
            payload : {
                data: res.data
            }
        });
    } ).catch( error => {
        dispatch({
            type: FETCH_UPDATED_USER_FAILURE,
            payload: {
                error: error.message
            }
        });
    } );
};

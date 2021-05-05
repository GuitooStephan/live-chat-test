import { FETCH_CHAT_REQUEST, FETCH_CHAT_SUCCEEDED, FETCH_CHAT_FAILURE, REMOVE_CHAT } from './types';
import { fetchRoom } from '../../services/chat.service';

export const fetchChat = payload => dispatch => {
    dispatch({
        type: FETCH_CHAT_REQUEST
    });
    fetchRoom( payload ).then( res => {
        dispatch({
            type: FETCH_CHAT_SUCCEEDED,
            payload: {
                data: res.data
            }
        });
    } ).catch( error => {
        dispatch({
            type: FETCH_CHAT_FAILURE,
            payload: {
                error: error.message
            }
        });
    } );
};

export const removeChat = () => dispatch => {
    dispatch( { type: REMOVE_CHAT } );
};

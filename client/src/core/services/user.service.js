import { post, get } from './api.service';

export const getProfile = payload => {
    const url = `/users`;
    return post( url, payload );
};

export const getUpdatedProfile = id => {
    const url = `/users/${id}`;
    return get( url );
};

export const getActiveUsers = id => {
    const url = `/users/${id}/active_users`;
    return get( url );
};

export const blockUser = ( id, payload ) => {
    const url = `/users/${id}/block`;
    return post( url, payload );
};

export const unblockUser = ( id, payload ) => {
    const url = `/users/${id}/unblock`;
    return post( url, payload );
};


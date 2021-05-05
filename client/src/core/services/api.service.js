import axios from 'axios';
import config from '../../config.json';


axios.defaults.baseURL = `${config.SERVER_URL}/api/v1/`;

export const get = ( url ) => {
    return axios.get( url );
};

export const post = ( url, payload ) => {
    return axios.post( url, payload );
};

export const _delete = ( url, id ) => {
    return axios.delete( url );
};

export const put = ( url, payload ) => {
    return axios.put( url, payload );
};

export const setTokenInterceptor = ( token ) => {
    axios.interceptors.request.eject(1);
    return axios.interceptors.request.use(function (config) {
        if ( token ) {
            config.headers.common.Authorization = `Bearer ${token}`;
        }
        return config;
    });
};

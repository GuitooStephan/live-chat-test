import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import chatReducer from './chat.reducer';
import activeUsersReducer from './active-users.reducer';


export default combineReducers( {
    user: userReducer,
    chat: chatReducer,
    activeUsers: activeUsersReducer
} );


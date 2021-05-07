import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';


const initialState = {};

const middlewares = [
    thunk
];

export default createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

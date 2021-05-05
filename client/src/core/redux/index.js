import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import reducers from './reducers';


const initialState = {};

const middlewares = [
    thunk
];

export default createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware( ...middlewares ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

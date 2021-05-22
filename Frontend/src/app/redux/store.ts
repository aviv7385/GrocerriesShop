import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { productsReducer } from "./products-state";

// when using multiple reducers:
const reducers = combineReducers({ productsState: productsReducer, authState: authReducer });
const store = createStore(reducers);

export default store;
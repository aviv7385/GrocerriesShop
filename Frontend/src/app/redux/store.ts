import { combineReducers, createStore } from "redux";
import { productsReducer } from "./products-state";

// when using multiple reducers:
const reducers = combineReducers({ productsState: productsReducer });
const store = createStore(reducers);

export default store;
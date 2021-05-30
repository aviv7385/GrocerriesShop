import { categoriesReducer } from './categories-state';
import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { productsReducer } from "./products-state";
import { cartsReducer } from './carts-state';

// when using multiple reducers:
const reducers = combineReducers({ productsState: productsReducer, authState: authReducer, categoriesState: categoriesReducer, cartsState: cartsReducer });
const store = createStore(reducers);

export default store;
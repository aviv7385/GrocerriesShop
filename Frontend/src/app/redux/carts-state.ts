import { ShoppingCartModel } from './../models/shopping-cart.model';
import { CartItemModel } from './../models/cart-item.model';


export class CartsState {
    public cartItems: CartItemModel[] = [];
    public cartItem: CartItemModel;
    public shoppingCart: ShoppingCartModel;
    public cartTotalPrice: number;

    // On page refresh - load saved cart and cart items back to state: 
    public constructor() {
        const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
        if (cartItems) {
            this.cartItems = cartItems;
        }
        const shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
        if (shoppingCart) {
            this.shoppingCart = shoppingCart;
        }
    }
}

// Carts Action Types: 
export enum CartsActionType {
    ShoppingCartCreated = "ShoppingCartCreated",
    CartItemAdded = "CartItemAdded",
    CartItemsDownloaded = "CartItemsDownloaded",
    CartTotalPrice = "CartTotalPrice",
    CartItemDeleted = "CartItemDeleted", // only one item was deleted
    CartItemsDeleted = "CartItemsDeleted", // all cart items wee deleted
    CartItemUpdated = "CartItemUpdated"
}

// Carts Action: 
export interface CartsAction {
    type: CartsActionType; // the type of action we want to execute
    payload?: any; // the data we want to send to Redux
}

// Carts Reducer: 
export function cartsReducer(
    currentState: CartsState = new CartsState(),
    action: CartsAction): CartsState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case CartsActionType.CartItemsDownloaded:
            newState.cartItems = action.payload;
            break;

        case CartsActionType.ShoppingCartCreated:
            newState.shoppingCart = action.payload; // payload = the added cart
            // save shopping cart in the session storage
            sessionStorage.setItem("shoppingCart", JSON.stringify(newState.shoppingCart));
            break;

        case CartsActionType.CartItemAdded:
            newState.cartItems.push(action.payload); // payload = the added item
            break;

        case CartsActionType.CartItemDeleted:
            const indexToDelete = newState.cartItems.findIndex(i => i.itemId === action.payload.itemId); // payload = the deleted cart item's id
            newState.cartItems.splice(indexToDelete, 1);
            break;

        case CartsActionType.CartItemsDeleted:
            const cartId = newState.cartItems.findIndex(i => i.cartId === action.payload.cartId); // payload = the deleted cart item's id
            newState.cartItems.splice(cartId, 1);
            break;

        case CartsActionType.CartItemUpdated:
            const indexToUpdate = newState.cartItems.findIndex(i => i.itemId === action.payload);
            newState.cartItems[indexToUpdate] = action.payload; // payload = the updated cart item
            break;

        case CartsActionType.CartTotalPrice:
            newState.cartTotalPrice = action.payload;
            break;
    }

    // Save cartItems also in sessionStorage:
    sessionStorage.setItem("cartItems", JSON.stringify(newState.cartItems));

    return newState; // Return the newState.
}
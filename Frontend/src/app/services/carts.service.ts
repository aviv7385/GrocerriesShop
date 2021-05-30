import { ProductsService } from './products.service';
import { CartItemModel } from './../models/cart-item.model';
import { ShoppingCartModel } from './../models/shopping-cart.model';
import { CartsActionType } from './../redux/carts-state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CartsService {

    constructor(private httpClient: HttpClient, private productsService: ProductsService) { }

    // get all cart items
    public async getAllCartItems(cartId: number): Promise<CartItemModel[]> {
        if (store.getState().cartsState.cartItems.length === 0) {
            const cartItems = await this.httpClient.get<CartItemModel[]>(environment.cartsUrl + cartId).toPromise();
            store.dispatch({ type: CartsActionType.CartItemsDownloaded, payload: cartItems });
        }
        return store.getState().cartsState.cartItems;
    }


    // create new shopping cart
    public async addShoppingCart(shoppingCart: ShoppingCartModel): Promise<ShoppingCartModel> {
        if (!store.getState().cartsState.shoppingCart) {
            shoppingCart.userId = store.getState().authState.user.userId;
            shoppingCart.date = new Date();
            const newShoppingCart = await this.httpClient.post<ShoppingCartModel>(environment.cartsUrl, shoppingCart).toPromise();
            store.dispatch({ type: CartsActionType.ShoppingCartCreated, payload: newShoppingCart });
        }
        return store.getState().cartsState.shoppingCart;
    }

    // add an item to the cart
    public async addCartItem(cartItem: CartItemModel, productId: number, quantity: number): Promise<CartItemModel> {
        cartItem.cartId = store.getState().cartsState.shoppingCart.cartId;
        cartItem.productId = productId;
        cartItem.quantity = quantity;
        const addedItem = await this.httpClient.post<CartItemModel>(environment.cartsUrl + "items", cartItem).toPromise();
        store.dispatch({ type: CartsActionType.CartItemAdded, payload: addedItem });
        return addedItem;
    }
}

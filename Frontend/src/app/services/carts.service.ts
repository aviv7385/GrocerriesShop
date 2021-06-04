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
        const cartItems = await this.httpClient.get<CartItemModel[]>(environment.cartsUrl + cartId).toPromise();
        store.dispatch({ type: CartsActionType.CartItemsDownloaded, payload: cartItems });
        return store.getState().cartsState.cartItems;
    }

    // get all shopping carts
    public async getAllShoppingCarts():Promise<ShoppingCartModel[]>{
        const shoppingCart = await this.httpClient.get<ShoppingCartModel[]>(environment.cartsUrl).toPromise();
        return shoppingCart;
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
        const shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
        cartItem.cartId = shoppingCart.cartId;
        cartItem.productId = productId;
        cartItem.quantity = quantity;
        const addedItem = await this.httpClient.post<CartItemModel>(environment.cartsUrl + "items", cartItem).toPromise();
        store.dispatch({ type: CartsActionType.CartItemAdded, payload: addedItem });
        return addedItem;
    }

    // get total price of all cart items
    public async getTotalCartPrice(cartId: number): Promise<CartItemModel> {
        const totalCartPrice = await this.httpClient.get<CartItemModel>(environment.cartsUrl + "total-price/" + cartId).toPromise();
        store.dispatch({type: CartsActionType.CartTotalPrice, payload: totalCartPrice});
        return totalCartPrice;
    }

    // delete one item /items/:itemId
    public async deleteOneItem(itemId: number) {
        await this.httpClient.delete<CartItemModel>(environment.cartsUrl + "items/" + itemId).toPromise();
        store.dispatch({ type: CartsActionType.CartItemDeleted, payload: itemId });
    }

    // delete all items from a cart
    public async deleteAllCartItems(cartId: number) {
        await this.httpClient.delete<CartItemModel>(environment.cartsUrl + "remove-items/" + cartId).toPromise();
        store.dispatch({ type: CartsActionType.CartItemDeleted, payload: cartId });
    }

    // when cart is ordered (when the order is closed) - update the isOrdered column (in shoppingcarts table) from "false" to "true"
    public async updateIsOrdered(shoppingCart: ShoppingCartModel): Promise<ShoppingCartModel> {
        shoppingCart.isOrdered = true;
        const updatedShoppingCart = await this.httpClient.patch<ShoppingCartModel>(environment.cartsUrl + "is-ordered/" + shoppingCart.cartId, shoppingCart).toPromise();
        return updatedShoppingCart;
    }

}

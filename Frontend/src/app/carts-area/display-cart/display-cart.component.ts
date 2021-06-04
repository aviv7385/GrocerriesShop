import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import { ErrorsService } from './../../services/errors.service';
import { CartItemModel } from './../../models/cart-item.model';
import { Component, Input, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-display-cart',
    templateUrl: './display-cart.component.html',
    styleUrls: ['./display-cart.component.css']
})
export class DisplayCartComponent implements OnInit {

    public totalCartPrice: number;
    public user = store.getState().authState.user;
    public cartItems: CartItemModel[];
    public shoppingCart = store.getState().cartsState.shoppingCart;
    public shoppingCarts: ShoppingCartModel[];
    private unsubscribeStore: Unsubscribe;

    constructor(private cartsService: CartsService, private errorsService: ErrorsService) {
        this.unsubscribeStore = store.subscribe(() => { // Start listening for changes.
            this.cartItems = store.getState().cartsState.cartItems;
            this.totalCartPrice = store.getState().cartsState.cartTotalPrice;
        });
    }

    public async ngOnInit() {
        try {
            if (this.shoppingCart) {
                this.cartItems = await this.cartsService.getAllCartItems(this.shoppingCart.cartId);
            }
            if (this.cartItems) {
                const totalPriceInfo = await this.cartsService.getTotalCartPrice(this.shoppingCart.cartId);
                this.totalCartPrice = totalPriceInfo.totalCartPrice;
            }
        }
        catch (err) {
            alert(this.errorsService.getError(err));
            console.log(err);
        }
    }

    public async removeOneItem(cartItemId: number) {
        try {
            const answer = window.confirm(`Are you sure you want to remove this item from your cart?`);
            if (!answer) {
                return;
            }
            await this.cartsService.deleteOneItem(cartItemId);

            this.ngOnInit();// reload this component

        }
        catch (err) {
            alert(this.errorsService.getError(err));
            console.log(err);
        }
    }

    public async removeAllItems(cartId: number) {
        try {
            const answer = window.confirm(`Are you sure you want to remove all items from your cart?`);
            if (!answer) {
                return;
            }
            await this.cartsService.deleteAllCartItems(cartId);

            this.ngOnInit();// reload this component
        }
        catch (err) {
            alert(this.errorsService.getError(err));
            console.log(err);
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribeStore();
    }
}
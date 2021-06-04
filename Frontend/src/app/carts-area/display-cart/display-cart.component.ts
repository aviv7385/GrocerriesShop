import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import { ErrorsService } from './../../services/errors.service';
import { CartItemModel } from './../../models/cart-item.model';
import { Component, Input, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import store from 'src/app/redux/store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-display-cart',
    templateUrl: './display-cart.component.html',
    styleUrls: ['./display-cart.component.css']
})
export class DisplayCartComponent implements OnInit {

    public totalCartPrice: any;
    public user = store.getState().authState.user;
    public cartItems: CartItemModel[];
    public shoppingCart = store.getState().cartsState.shoppingCart;
    public shoppingCarts: ShoppingCartModel[];

    constructor(private router: Router, private cartsService: CartsService, private errorsService: ErrorsService) { }

    public async ngOnInit() {
        try {
            if (this.shoppingCart) {
                this.cartItems = await this.cartsService.getAllCartItems(this.shoppingCart.cartId);
            }
            if (this.cartItems) {
                this.totalCartPrice = await this.cartsService.getTotalCartPrice(this.shoppingCart.cartId);
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
}
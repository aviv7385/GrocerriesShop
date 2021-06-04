import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
    selector: 'app-show-cart',
    templateUrl: './show-cart.component.html',
    styleUrls: ['./show-cart.component.css']
})
export class ShowCartComponent implements OnInit {

    public totalCartPrice: any;
    public user = store.getState().authState.user;
    public cartItems: CartItemModel[];
    public shoppingCart = store.getState().cartsState.shoppingCart;
    public shoppingCarts: ShoppingCartModel[];
    private unsubscribeStore: Unsubscribe;

    constructor(private cartsService: CartsService, private errorsService: ErrorsService) {
        this.unsubscribeStore = store.subscribe(() => { // Start listening for changes.
            this.cartItems = store.getState().cartsState.cartItems;
        });
    }

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

    public ngOnDestroy(): void {
        this.unsubscribeStore();
    }
}

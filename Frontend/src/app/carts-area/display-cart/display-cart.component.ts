import { ErrorsService } from './../../services/errors.service';
import { CartItemModel } from './../../models/cart-item.model';
import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-display-cart',
    templateUrl: './display-cart.component.html',
    styleUrls: ['./display-cart.component.css']
})
export class DisplayCartComponent implements OnInit {

    public products = store.getState().productsState.products;
    public cartItems: CartItemModel[];
    public shoppingCart = store.getState().cartsState.shoppingCart;

    constructor(private cartsService: CartsService, private errorsService: ErrorsService) { }

    public async ngOnInit() {
        try {
            this.cartItems = await this.cartsService.getAllCartItems(this.shoppingCart.cartId);
            console.log(this.cartItems);
        }
        catch (err) {
            alert(this.errorsService.getError(err));
            console.log(err);
        }
    }

}

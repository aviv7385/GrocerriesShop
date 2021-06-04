import store from 'src/app/redux/store';
import { Component, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import { CartsService } from 'src/app/services/carts.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
    selector: 'app-open-cart',
    templateUrl: './open-cart.component.html',
    styleUrls: ['./open-cart.component.css']
})
export class OpenCartComponent implements OnInit {

    public totalCartPrice: any;
    public shoppingCart = new ShoppingCartModel();
    public cartItem = new CartItemModel();
    public cartItems: CartItemModel[];
    public user = store.getState().authState.user;
    public shoppingCarts: ShoppingCartModel[];
    public openCart: ShoppingCartModel;
    public currentUserCarts: ShoppingCartModel[];
    constructor(private errorsService: ErrorsService, private cartsService: CartsService) { }

    public async ngOnInit() {
        try {
            this.checkForOpenCart();

        }
        catch (err) {
            this.errorsService.getError(err);
        }
    }

    public async checkForOpenCart() {
        try {
            this.shoppingCarts = await this.cartsService.getAllShoppingCarts();
            this.currentUserCarts = this.shoppingCarts.filter(c => c.userId === this.user.userId);
            console.log(this.currentUserCarts);
            if (this.currentUserCarts.length === 0) {
                // create new shopping cart or use an open one
                const newShoppingCart = await this.cartsService.addShoppingCart(this.shoppingCart);
                console.log(newShoppingCart);
            }
            const index = this.currentUserCarts.findIndex(i => i.isOrdered == false);
            if (index === -1) {
                // create new shopping cart or use an open one
                const newShoppingCart = await this.cartsService.addShoppingCart(this.shoppingCart);
                console.log(newShoppingCart);
            }
            this.openCart = this.currentUserCarts[index];
            console.log(this.openCart);
            //get the current price of the cart
            const cartPrice = await this.cartsService.getTotalCartPrice(this.openCart.cartId);
            this.totalCartPrice = +cartPrice.totalCartPrice;
            sessionStorage.setItem("shoppingCart", JSON.stringify(this.openCart));
        }
        catch (err) {
            this.errorsService.getError(err);
        }
    }


}

import { ErrorsService } from './../../services/errors.service';
import { CartItemModel } from './../../models/cart-item.model';
import { ShoppingCartModel } from './../../models/shopping-cart.model';
import { Component, Input, OnInit } from '@angular/core';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { ProductModel } from 'src/app/models/product.model';

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

    @Input() // props
    public product: ProductModel;

    public shoppingCart = new ShoppingCartModel();
    public cartItem = new CartItemModel();
    public cartItems: CartItemModel[];
    public user = store.getState().authState.user;
    public shoppingCarts: ShoppingCartModel[];

    constructor(private errorsService: ErrorsService, private cartsService: CartsService) { }

    public async ngOnInit() {
        try {
            
        }
        catch (err) {
            this.errorsService.getError(err);
        }
    }




}

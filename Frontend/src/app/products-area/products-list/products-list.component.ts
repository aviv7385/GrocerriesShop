import { NavigationEnd, Router } from '@angular/router';
import { ErrorsService } from './../../services/errors.service';
import { CartsService } from './../../services/carts.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    public mySubscription: any;
    public products: ProductModel[];
    public cartItems: CartItemModel[];
    public shoppingCart = store.getState().cartsState.shoppingCart;

    public constructor(private router: Router, private cartsService: CartsService, private pageTitle: Title, private productsService: ProductsService, private errorsService: ErrorsService) {
        // reload the component
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
            }
        });
    }

    public async ngOnInit() {
        this.pageTitle.setTitle("Products");

        // get data from the server using Redux + service
        try {
            this.products = await this.productsService.getAllProducts();
            console.log(this.products);

        }
        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    // display the items in the user's cart in a side bar
    public async displayCart() {
        try {
            if (this.shoppingCart) {
                this.cartItems = await this.cartsService.getAllCartItems(this.shoppingCart.cartId);
                console.log(this.cartItems);
            }
        }
        catch (err) {
            alert(this.errorsService.getError(err));
            console.log(err);
        }
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

  

}

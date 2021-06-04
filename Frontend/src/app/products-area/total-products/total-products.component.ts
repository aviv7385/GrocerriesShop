import { OrdersService } from './../../services/orders.service';
import { ProductModel } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import { ProductsService } from 'src/app/services/products.service';
import { OrderModel } from 'src/app/models/order.model';

@Component({
    selector: 'app-total-products',
    templateUrl: './total-products.component.html',
    styleUrls: ['./total-products.component.css']
})
export class TotalProductsComponent implements OnInit {

    public unsubscribeStore: Unsubscribe;
    public products: ProductModel[];
    public totalProducts = store.getState().productsState.products.length;
    public totalOrders = store.getState().ordersState.orders.length;
    public orders: OrderModel[];

    constructor(private productsService: ProductsService, private ordersService: OrdersService) { 
        this.unsubscribeStore = store.subscribe(() => { // Start listening for changes.
            this.totalProducts = store.getState().productsState.products.length;
            this.totalOrders = store.getState().ordersState.orders.length;
        });
    }

    public async ngOnInit(){
        this.products = await this.productsService.getAllProducts();
        sessionStorage.removeItem("products");
        this.orders = await this.ordersService.getAllOrders();
    }

    public ngOnDestroy(): void {
        this.unsubscribeStore();
    }
}

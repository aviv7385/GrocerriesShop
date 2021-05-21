import { ProductsActionType } from './../redux/products-state';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import store from '../redux/store';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private myHttp: HttpClient) { }

    // check if there are products in the store. if there are - bring all the products from the store.
    // if there are no products in the store - get the products from the server, save them to the store, 
    // and then get the products from the store
    public async getAllProducts(): Promise<ProductModel[]> {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.myHttp.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch({ type: ProductsActionType.ProductsDownloaded, payload: products });
        }
        return store.getState().productsState.products;
    }
}
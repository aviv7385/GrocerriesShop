import { ProductsActionType, productsReducer } from './../redux/products-state';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import store from '../redux/store';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private httpClient: HttpClient) { }

    // check if there are products in the store. if there are - bring all the products from the store.
    // if there are no products in the store - get the products from the server, save them to the store, 
    // and then get the products from the store
    public async getAllProducts(): Promise<ProductModel[]> {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.httpClient.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch({ type: ProductsActionType.ProductsDownloaded, payload: products });
        }
        return store.getState().productsState.products;
    }

    // send data to the server using Promise 
    public async addProduct(product: ProductModel): Promise<ProductModel> {
        const myFormData = new FormData();
        myFormData.append("productName", product.productName);
        myFormData.append("categoryId", product.categoryId.toString());
        myFormData.append("price", product.price.toString());
        myFormData.append("image", product.image);
        const addedProduct = await this.httpClient.post<ProductModel>(environment.adminUrl, myFormData).toPromise();
        store.dispatch({ type: ProductsActionType.ProductAdded, payload: addedProduct });
        return addedProduct;
    }


    // get one product
    public async getOneProduct(productId: number): Promise<ProductModel> {
        if (store.getState().productsState.products.length === 0) {
            return await this.httpClient.get<ProductModel>(environment.productsUrl + productId).toPromise();
        }
        return store.getState().productsState.products.find(p => p.productId === productId);
    }

    // update product
    public async UpdateProduct(productId: number, product: ProductModel): Promise<ProductModel> {
        if (store.getState().productsState.products.length === 0) {
            this.getAllProducts();
        }
        const myFormData = new FormData();
        myFormData.append("productName", product.productName);
        myFormData.append("categoryId", product.categoryId.toString());
        myFormData.append("price", product.price.toString());
        myFormData.append("image", product.image);

        const updatedProduct = await this.httpClient.patch<ProductModel>(environment.adminUrl + productId, myFormData).toPromise();
        store.dispatch({ type: ProductsActionType.ProductUpdated, payload: updatedProduct });
        return updatedProduct;
    }
}
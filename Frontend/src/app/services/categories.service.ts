import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { CategoriesActionType } from '../redux/categories-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private httpClient: HttpClient) { }

    // check if there are categories in the store. if there are - bring all the categories from the store.
    // if there are no categories in the store - get the categories from the server, save them to the store, 
    // and then get the categories from the store

    public async getAllCategories(): Promise<CategoryModel[]> {
        if (store.getState().categoriesState.categories.length === 0) {
            const categories = await this.httpClient.get<CategoryModel[]>(environment.productsUrl + "categories").toPromise();
            store.dispatch({ type: CategoriesActionType.CategoriesDownloaded, payload: categories });
        }
        return store.getState().categoriesState.categories;
    }
}

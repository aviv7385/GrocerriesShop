import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { CategoriesActionType } from '../redux/categories-state';
import store from '../redux/store';
import { ErrorsService } from './errors.service';
import { ProductsService } from './products.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private httpClient: HttpClient, private productsService: ProductsService, private errorsService: ErrorsService, private activatedRoute: ActivatedRoute) { }

    // check if there are categories in the store. if there are - bring all the categories from the store.
    // if there are no categories in the store - get the categories from the server, save them to the store, 
    // and then get the categories from the store

    public async getAllCategories(): Promise<CategoryModel[]> {
        if (store.getState().categoriesState.categories.length === 0) {
            const categories = await this.httpClient.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            store.dispatch({ type: CategoriesActionType.CategoriesDownloaded, payload: categories });
        }
        return store.getState().categoriesState.categories;
    }

}

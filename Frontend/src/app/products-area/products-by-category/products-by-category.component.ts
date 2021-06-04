import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from './../../models/product.model';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { ProductsService } from 'src/app/services/products.service';
import store from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user.model';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-products-by-category',
    templateUrl: './products-by-category.component.html',
    styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {

    public products: ProductModel[];
    public categories: CategoryModel[];
    public productsByCategory: ProductModel[];
    public user: UserModel = store.getState().authState.user;
    public unsubscribeStore: Unsubscribe;


    constructor( private errorsService: ErrorsService, private activatedRoute: ActivatedRoute, private categoriesService: CategoriesService, private productsService: ProductsService) { }

    
    public async ngOnInit() {
        try {

            this.getProducts();
            
            // get user details from the store to check if the user is admin or not (to know which kind of product card needs to be displayed)
            this.unsubscribeStore = store.subscribe(() => {
                this.user = store.getState().authState.user;
            });

        }
        catch (err) {
            this.errorsService.getError(err);
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribeStore();
    }

    public async getProducts() {
        try {
            // get the categoryId from the url
            const categoryId = +this.activatedRoute.snapshot.params.categoryId;
            console.log(categoryId);

            // get all products
            this.products = await this.productsService.getAllProducts();
            // filter the products array so that the new array will include only the products which belong to the wanted category
            this.productsByCategory = this.products.filter(p => p.categoryId === categoryId);
            console.log(this.productsByCategory);
        }
        catch (err) {
            this.errorsService.getError(err);
        }
    }


}

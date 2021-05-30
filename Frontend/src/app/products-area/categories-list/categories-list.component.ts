import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
    
    public categories: CategoryModel[];
    
    constructor(private errorsService: ErrorsService, private activatedRoute: ActivatedRoute, private categoriesService: CategoriesService, private productsService: ProductsService) { }

    public async ngOnInit() {
        try {
             // get list of categories 
            this.categories = await this.categoriesService.getAllCategories();
            console.log(this.categories);
        }
        catch (err) {
            console.log(err);
            alert(err.statusText);
        }
    }

}

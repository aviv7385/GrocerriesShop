import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

    public categories: CategoryModel[];

    constructor(private errorsService: ErrorsService, private categoriesService: CategoriesService) { }

    public async ngOnInit() {
        try {
            // get list of categories 
            this.categories = await this.categoriesService.getAllCategories();
            console.log(this.categories);
        }
        catch (err) {
            console.log(err);
            alert(this.errorsService.getError(err));
        }
    }

}

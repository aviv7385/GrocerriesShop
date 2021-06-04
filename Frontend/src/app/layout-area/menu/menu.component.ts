import { CategoryModel } from './../../models/category.model';
import { Component,  OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CategoriesService } from 'src/app/services/categories.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


    public user: UserModel = store.getState().authState.user;
    public categories: CategoryModel[];
    public unsubscribeStore: Unsubscribe;

    constructor(private categoriesService: CategoriesService, private errorsService: ErrorsService) {
        this.unsubscribeStore = store.subscribe(() => {
            this.user = store.getState().authState.user;
        });
    }


    public async ngOnInit() {
        try {


            // get list of categories for the drop down menu
            this.categories = await this.categoriesService.getAllCategories();
        }
        catch (err) {
            alert(this.errorsService.getError(err));

            console.log(err);
        }

    }

    public ngOnDestroy(): void {
        this.unsubscribeStore();
    }


}

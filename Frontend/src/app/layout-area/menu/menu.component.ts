import { ProductsByCategoryComponent } from './../../products-area/products-by-category/products-by-category.component';
import { CategoryModel } from './../../models/category.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


    public user: UserModel = store.getState().authState.user;
    public categories: CategoryModel[];
    public unsubscribeStore: Unsubscribe;

    constructor(private categoriesService: CategoriesService, private activatedRoute: ActivatedRoute) { }


    public async ngOnInit() {

        // get list of categories for the drop down menu
        this.categories = await this.categoriesService.getAllCategories();

        this.unsubscribeStore = store.subscribe(() => {
            this.user = store.getState().authState.user;
        });
    }

    public ngOnDestroy(): void {
        this.unsubscribeStore();
    }


}

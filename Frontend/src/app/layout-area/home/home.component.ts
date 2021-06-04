import { ProductModel } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public user = store.getState().authState.user;

    constructor() { }

    public async ngOnInit() {

    }

}

import { ProductModel } from 'src/app/models/product.model';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.css']
})
export class AdminProductCardComponent implements OnInit {

    @Input() // props
    public product: ProductModel;

    public imageUrl: string;

    public ngOnInit(): void {
        this.imageUrl = environment.productsUrl + "images/" + this.product.imageFileName;
    }

}

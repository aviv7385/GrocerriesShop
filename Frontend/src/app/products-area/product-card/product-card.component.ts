import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input() // props
    public product: ProductModel;

    public imageUrl: string;

    public ngOnInit(): void {
        this.imageUrl = environment.productsUrl + "images/" + this.product.imageFileName;
    }
}

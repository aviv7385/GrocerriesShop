import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    public products: ProductModel[];

    public constructor(private pageTitle: Title, private productsService: ProductsService) { }
   
    public async ngOnInit() {
        this.pageTitle.setTitle("Products");

        // get data from the server using Redux + service
        try {
            this.products = await this.productsService.getAllProducts();
            console.log(this.products);
        }
        catch(err) {
            alert(err.message);
            console.log(err);
        }
    }

}

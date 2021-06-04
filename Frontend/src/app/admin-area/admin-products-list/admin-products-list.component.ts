import { ProductModel } from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsService } from 'src/app/services/products.service';
import { NavigationEnd, Router } from '@angular/router';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements OnInit {

    public mySubscription: any;
    public products: ProductModel[];

    public constructor(private errorsService: ErrorsService,private router: Router,private pageTitle: Title, private productsService: ProductsService) { 
        // reload the component
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
          this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              // Trick the Router into believing it's last link wasn't previously loaded
              this.router.navigated = false;
            }
          });
    }
   
    public async ngOnInit() {
        this.pageTitle.setTitle("Admin Area");

        // get data from the server using Redux + service
        try {
            this.products = await this.productsService.getAllProducts();
            console.log(this.products);
        }
        catch(err) {
            alert(this.errorsService.getError(err));
            console.log(err);
        }
    }

    ngOnDestroy() {
        if (this.mySubscription) {
          this.mySubscription.unsubscribe();
        }
      }

}

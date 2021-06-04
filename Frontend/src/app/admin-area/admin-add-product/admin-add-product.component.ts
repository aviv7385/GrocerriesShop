import { ErrorsService } from './../../services/errors.service';
import { CategoryModel } from './../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
    selector: 'app-admin-add-product',
    templateUrl: './admin-add-product.component.html',
    styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {

    public categories: CategoryModel[];
    public product = new ProductModel();
    public preview: string; // image preview

    constructor(private errorsService: ErrorsService, private productsService: ProductsService, private categoriesService: CategoriesService, private router: Router) { }

    // get list of categories for the select box
    public async ngOnInit() {
        try {
            this.categories = await this.categoriesService.getAllCategories();
            console.log(this.categories);
        }
        catch (err) {
            console.log(err);
            alert(this.errorsService.getError(err));
        }
    }

    // this function will get the image from the user and insert it to the product object 
    public handleImage(image: Event): void {
        this.product.image = (image.target as HTMLInputElement).files[0];
        // read the image into preview variable (to display a preview of the image)
        const fileReader = new FileReader(); // JavaScript obj which can read files from the user's computer
        fileReader.onload = args => this.preview = args.target.result.toString(); // when done reading - set the image into the preview variable
        fileReader.readAsDataURL(this.product.image); // start reading
    }

    public async addProduct() {
        try {
            const addedProduct = await this.productsService.addProduct(this.product);
            alert(addedProduct.productName + " was added successfully!");
            this.router.navigateByUrl("/admin"); // redirect
        }
        catch (err) {
            console.log(err);
            alert(this.errorsService.getError(err));
        }
    }

}

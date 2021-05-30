import { CategoriesService } from 'src/app/services/categories.service';
import { CategoryModel } from './../../models/category.model';
import { ErrorsService } from './../../services/errors.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-admin-edit-product',
    templateUrl: './admin-edit-product.component.html',
    styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit {

    public categories: CategoryModel[];
    public product: ProductModel;
    public imageUrl: string;
    public preview: string; // image preview

    public constructor(private errorsService: ErrorsService, private router: Router, private activatedRoute: ActivatedRoute, private categoriesService: CategoriesService, private productsService: ProductsService) { }

    // get the data we already have about the product to display it in the editing form:
    public async ngOnInit() {
        // get the data from the server or from the state (using redux + service)
        try {
            // get the product id from the url: 
            const productId = +this.activatedRoute.snapshot.params.productId;
           
            // get the specific product's details from the store
            this.product = await this.productsService.getOneProduct(productId);

            // get the list of categories from the store
            this.categories = await this.categoriesService.getAllCategories();

            // get the image from the server:
            this.imageUrl = environment.productsUrl + "images/" + this.product.imageFileName;
        }
        catch (err) {
            this.errorsService.getError(err);
        }
    }

    // get the image from the client and save it as a property of the product object
    public handleImage(image: Event) {
        this.product.image = (image.target as HTMLInputElement).files[0];

        // read the image into preview variable (to display a preview of the image)
        const myFileReader = new FileReader(); // JavaScript obj which can read files from the user's computer
        myFileReader.onload = args => this.preview = args.target.result.toString(); // when done reading - set the image into the preview variable
        myFileReader.readAsDataURL(this.product.image); // start reading
    }

    // send the updated data to the server
    public async update() {
        try {
            const productId = +this.activatedRoute.snapshot.params.productId;
            const product = await this.productsService.getOneProduct(productId);
            const updatedProduct = await this.productsService.UpdateProduct(productId, product);
            alert(updatedProduct.productName + " has been successfully updated");
            this.router.navigateByUrl("/admin"); // redirect
        }
        catch (err) {
            this.errorsService.getError(err);
        }
    }

}

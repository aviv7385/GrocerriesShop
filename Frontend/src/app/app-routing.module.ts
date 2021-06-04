import { ProductsByCategoryComponent } from './products-area/products-by-category/products-by-category.component';
import { AdminGuard } from './services/admin.guard';
import { AdminEditProductComponent } from './admin-area/admin-edit-product/admin-edit-product.component';
import { AdminProductsListComponent } from './admin-area/admin-products-list/admin-products-list.component';
import { ProductsListComponent } from './products-area/products-list/products-list.component';
import { LoginGuard } from './services/login.guard';
import { LogoutComponent } from './auth-area/logout/logout.component';
import { LoginComponent } from './auth-area/login/login.component';
import { RegisterComponent } from './auth-area/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout-area/home/home.component';
import { Page404Component } from './shared-area/page404/page404.component';
import { Register2Component } from './auth-area/register2/register2.component';
import { AdminAddProductComponent } from './admin-area/admin-add-product/admin-add-product.component';
import { AddToCartComponent } from './carts-area/add-to-cart/add-to-cart.component';
import { CloseOrderComponent } from './carts-area/close-order/close-order.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "products", canActivate: [LoginGuard], component: ProductsListComponent },
    { path: "admin", canActivate: [AdminGuard], component: AdminProductsListComponent },
    { path: "products/:productId", canActivate: [AdminGuard], component: AdminEditProductComponent },
    { path: "add-product", canActivate: [AdminGuard], component: AdminAddProductComponent },
    { path: "products/categories/:categoryId", canActivate: [LoginGuard], component: ProductsByCategoryComponent },
    { path: "register", component: RegisterComponent },
    { path: "register-step2", component: Register2Component },
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    { path: "carts", component: AddToCartComponent },
    { path: "order", canActivate: [LoginGuard], component: CloseOrderComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" }, // default route
    { path: "**", component: Page404Component } // page not found
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

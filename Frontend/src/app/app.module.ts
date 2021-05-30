//import { CategoriesListComponent } from './products-area/categories-list/categories-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout-area/layout/layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './layout-area/home/home.component';
import { HeaderComponent } from './layout-area/header/header.component';
import { MenuComponent } from './layout-area/menu/menu.component';
import { FooterComponent } from './layout-area/footer/footer.component';
import { ProductsListComponent } from './products-area/products-list/products-list.component';
import { ProductCardComponent } from './products-area/product-card/product-card.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { Page404Component } from './shared-area/page404/page404.component';
import { LoginComponent } from './auth-area/login/login.component';
import { LogoutComponent } from './auth-area/logout/logout.component';
import { RegisterComponent } from './auth-area/register/register.component';
import { Register2Component } from './auth-area/register2/register2.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AdminProductCardComponent } from './admin-area/admin-product-card/admin-product-card.component';
import { AdminProductsListComponent } from './admin-area/admin-products-list/admin-products-list.component';
import { AdminAddProductComponent } from './admin-area/admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './admin-area/admin-edit-product/admin-edit-product.component';
import { ProductsByCategoryComponent } from './products-area/products-by-category/products-by-category.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
//import { CategoriesMenuComponent } from './products-area/categories-menu/categories-menu.component';

@NgModule({
    declarations: [
        LayoutComponent,
        HomeComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        ProductsListComponent,
        ProductCardComponent,
        Page404Component,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        Register2Component,
        AdminProductCardComponent,
        AdminProductsListComponent,
        AdminAddProductComponent,
        AdminEditProductComponent,
        ProductsByCategoryComponent
        //CategoriesMenuComponent
        //CategoriesListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }],
    bootstrap: [LayoutComponent]
})
export class AppModule { }

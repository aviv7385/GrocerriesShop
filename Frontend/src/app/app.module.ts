import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout-area/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
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
import { Page404Component } from './shared-area/page404/page404.component';
import { LoginComponent } from './auth-area/login/login.component';
import { LogoutComponent } from './auth-area/logout/logout.component';
import { RegisterComponent } from './auth-area/register/register.component';

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatTooltipModule
    ],
    providers: [],
    bootstrap: [LayoutComponent]
})
export class AppModule { }

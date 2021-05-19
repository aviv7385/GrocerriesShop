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

@NgModule({
    declarations: [
        LayoutComponent,
        HomeComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [LayoutComponent]
})
export class AppModule { }

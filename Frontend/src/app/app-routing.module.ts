import { RegisterComponent } from './auth-area/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout-area/home/home.component';
import { Page404Component } from './shared-area/page404/page404.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "**", component: Page404Component}, // page not found
    { path: "", redirectTo: "/home", pathMatch: "full" } // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

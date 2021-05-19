import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout-area/home/home.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "**", redirectTo: "/home", pathMatch: "full" }, // page not found
    { path: "", redirectTo: "/home", pathMatch: "full" } // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

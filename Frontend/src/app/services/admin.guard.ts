import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import store from '../redux/store';

// check if user is Admin


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    router: any;
    public canActivate(): boolean {
        if (store.getState().authState.user.isAdmin) {
            return true; // you can enter the target route
        };

        alert("You are not authorized!"); // show alert 

        this.router.navigateByUrl("/home"); // redirect to login page
        return false; // you cannot enter the target route
    }
  
}

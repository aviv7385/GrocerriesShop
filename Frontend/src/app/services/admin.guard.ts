import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import store from '../redux/store';

// check if user is Admin


@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    router: any;
    public canActivate(): boolean {
        if (store.getState().authState.user && store.getState().authState.user.isAdmin) {
            return true; // you can enter the target route
        };

        alert("You are not authorized!"); // show alert 

        this.router.navigateByUrl("/home"); // redirect to login page
        return false; // you cannot enter the target route
    }

}

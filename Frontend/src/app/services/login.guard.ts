import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';


// check if user is logged in

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    public constructor(private router: Router) { }

    public canActivate(): boolean {
        if (store.getState().authState.user) {
            return true; // you can enter the target route
        };

        alert("Please login first"); // show alert 

        this.router.navigateByUrl("/home"); // redirect to home page
        return false; // you cannot enter the target route
    }
}

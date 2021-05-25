import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public user = new UserModel();
    public isPasswordConfirmed: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    // send data of new user to the server
    public async register() {
        try {
            // first check if passwords match - only if they do proceed to send the data to the server
            if (!this.isPasswordConfirmed) {
                alert("Passwords do not match, please retype");
                return;
            }
            else {
                const registeredUser = await this.authService.registerStep1(this.user);
                this.router.navigateByUrl("/register-step2"); // continue to next step of registration
            }
        }
        catch (err) {
            alert(err.error);
            console.log(err);
        }
    }

    // compare between the "password" input and the "confirm password" input
    public getValueFromInput() {
        const password = (<HTMLInputElement>document.getElementById("password")).value;
        const confirmPassword = (<HTMLInputElement>document.getElementById("confirm-password")).value;
        if (password === confirmPassword) {
            this.isPasswordConfirmed = true;
        }
        else {
            this.isPasswordConfirmed = false;
        }
    }
}

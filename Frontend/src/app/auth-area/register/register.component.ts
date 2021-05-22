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

    constructor(private authService: AuthService, private router: Router) { }

    public async register() {
        try {
            const registeredUser = await this.authService.register(this.user);
            console.log(registeredUser);
            alert("Welcome " + registeredUser.firstName);
            this.router.navigateByUrl("/home");
        }
        catch (err) {
            alert(err.error);
            console.log(err);
        }
    }
}

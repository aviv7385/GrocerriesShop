import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();

    public constructor(private authService: AuthService, private router: Router) { }

    public async login() {
        try {
            const loggedInUser = await this.authService.login(this.credentials);
            alert("Hello " + loggedInUser.firstName + " " + loggedInUser.lastName);
            if (loggedInUser.isAdmin) {
                this.router.navigateByUrl("/admin");
            }
            else {
                this.router.navigateByUrl("/home");
            }
        }
        catch (err) {
            alert(err.error);
            console.log(err);
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityModel } from 'src/app/models/city.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
    selector: 'app-register2',
    templateUrl: './register2.component.html',
    styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {

    public user = new UserModel();
    public userId = store.getState().authState.user.userId;
    public cities: CityModel[];

    constructor(private errorsService: ErrorsService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

    // get list of cities
    public async ngOnInit() {
        try {
            // get all cities (to display in the "select" box)
            this.cities = await this.authService.getCitiesList();
        }
        catch (err) {
            console.log(err);
            alert(this.errorsService.getError(err));
        }
    }

    public async updateUser() {
        try {
            const updatedUser = await this.authService.registerStep2(this.userId, this.user);
            alert(`Welcome ${updatedUser.firstName} ${updatedUser.lastName}!`);
            this.router.navigateByUrl("/home");
        }
        catch (err) {
            alert(this.errorsService.getError(err));
            console.log(err);
        }
    }



}

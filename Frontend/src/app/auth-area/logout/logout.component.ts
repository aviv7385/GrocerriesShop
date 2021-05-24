import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    public constructor(private authService: AuthService,  private router: Router) { }

    public ngOnInit(): void {

        this.authService.logout(); // logout

        alert("You are now logged out");
        this.router.navigateByUrl("/home"); // redirect to home page
    }

}

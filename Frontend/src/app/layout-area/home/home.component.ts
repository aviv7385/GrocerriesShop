
import { Component } from '@angular/core';
import store from 'src/app/redux/store';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    public user = store.getState().authState.user;


}

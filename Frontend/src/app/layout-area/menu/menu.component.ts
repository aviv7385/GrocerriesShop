import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    public user: UserModel = store.getState().authState.user;
    public unsubscribeStore: Unsubscribe;

    public ngOnInit(): void {

        this.unsubscribeStore = store.subscribe(() => {
            this.user = store.getState().authState.user;
        });
    }

    public ngOnDestroy(): void {
        this.unsubscribeStore();
    }

}

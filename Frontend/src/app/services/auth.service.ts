import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import { userLoggedInAction, userLoggedOutAction, UserRegisteredAction } from 'src/app/redux/auth-state';
import store from 'src/app/redux/store';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public constructor(private httpClient: HttpClient) { }


    // register new user
    public async register(user: UserModel): Promise<UserModel> {
        const registeredUser = await this.httpClient.post<UserModel>(environment.authUrl + "register", user).toPromise();
        store.dispatch(UserRegisteredAction(registeredUser));
        return registeredUser;
    }

    // login existing user
    public async login(credentials: CredentialsModel): Promise<UserModel> {
        const loggedInUser = await this.httpClient.post<UserModel>(environment.authUrl + "login", credentials).toPromise();

        // send loggedInUser to redux
        store.dispatch(userLoggedInAction(loggedInUser));

        return loggedInUser;
    }

    // logout user
    public logout(): void {
        store.dispatch(userLoggedOutAction());
    }
}

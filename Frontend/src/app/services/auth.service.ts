import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import { UserDownloadedAction, userLoggedInAction, userLoggedOutAction, UserRegisteredAction, UserUpdatedAction } from 'src/app/redux/auth-state';
import store from 'src/app/redux/store';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public constructor(private httpClient: HttpClient) { }

    // register new user - step 1
    public async registerStep1(user: UserModel): Promise<UserModel> {
        const registeredUser = await this.httpClient.post<UserModel>(environment.authUrl + "register", user).toPromise();
        store.dispatch(UserRegisteredAction(registeredUser));
        return registeredUser;
    }

    // update user (register step 2):
    public async registerStep2(userId: number, user: UserModel): Promise<UserModel> {
        if (store.getState().authState.users.length === 0) {
            this.getAllUsers();
        }
        const updatedUser = await this.httpClient.patch<UserModel>(environment.authUrl + "register/" + userId, user).toPromise();
        store.dispatch(UserUpdatedAction(updatedUser));
        return updatedUser;
    }

    // check if we already have all users in the global state
    // if we do - get the users from the state
    // if we don't - get the users from the server and save them in the global state
    public async getAllUsers(): Promise<UserModel[]> {
        if (store.getState().authState.users.length === 0) {
            const users = await this.httpClient.get<UserModel[]>(environment.usersUrl).toPromise();
            store.dispatch(UserDownloadedAction(users));
        }
        return store.getState().authState.users;
    }

    // get one user
    public async getOneUser(userId: number): Promise<UserModel> {
        if (store.getState().authState.users.length === 0) {
            return await this.httpClient.get<UserModel>(environment.usersUrl + userId).toPromise();
        }
        return store.getState().authState.users.find(u => u.userId === userId);
    }


    // get all cities 
    public async getCitiesList(): Promise<any> {
        return await this.httpClient.get(environment.authUrl + "cities").toPromise();
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

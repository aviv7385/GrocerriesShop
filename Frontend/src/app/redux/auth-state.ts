import { UserModel } from "../models/user.model";

export class AuthState {
    public user: UserModel = null; // The data in the app level.

    // On page refresh - load saved user back to state: 
    public constructor() {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            this.user = user;
        }
    }
}

// User Action Type:
export enum AuthActionType {
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut"
}

// User Action:
export interface AuthAction {
    type: AuthActionType; // the type of action we want to execute
    payload?: any; // the data we want to send to Redux
}

// User Action Creators: 
export function UserRegisteredAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserRegistered, payload: user }
}
export function userLoggedInAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: user };
}
export function userLoggedOutAction(): AuthAction {
    return { type: AuthActionType.UserLoggedOut };
}


// User Reducer: 
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };// Duplicate currentState into a newState.

    switch (action.type) {

        // combined cases - whether the user is doing Register or Login - do the same action
        case AuthActionType.UserRegistered:
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload;
            // Save user also in sessionStorage:
            sessionStorage.setItem("user", JSON.stringify(newState.user));
            break;

        case AuthActionType.UserLoggedOut:
            newState.user = null;
            sessionStorage.removeItem("user"); // delete user from session storage
            break;
    }

    return newState;
}

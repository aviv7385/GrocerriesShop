import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import store from '../redux/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // what i want the interceptor to do(if user is logged in):
        if (store.getState().authState.user) {
            // clone the request object
            request = request.clone({
                // add the token to any request
                setHeaders: {
                    Authorization: "Bearer " + store.getState().authState.user.token
                }
            });
        }
        // call next for continuing the request
        return next.handle(request);
    }
}

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {

    // since we never what kind of data the server will return to the client when there's an error - we have to check
    // so we can display the correct error to the user. 
    public getError(err: any) {
        // if err = one string (status 401)
        if (typeof err === "string") {
            return err;
        }

        // if err.error = one string (status 400)
        if (typeof err.error === "string") {
            return err.error;
        }

        // if err.error = array of strings (status 400)
        if (Array.isArray(err.error)) {
            let allErrors = "";
            for (const item of err.error) {
                allErrors += item + "<br>";
            }
            return allErrors;
        }

        // frontend exception containing message
        if (typeof err.message === "string") {
            if (err.message.startsWith("Http failure response")) {
                return "Either the server is down or your internet connection is down";
            }
            return err.message;
        }

        return "Some error occurred, please try again later.";
    }
}

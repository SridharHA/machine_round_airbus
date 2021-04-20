import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  loaderEmitter = new Subject<boolean>();
  constructor(private http:HttpClient) { }
  
  // Http call to signup
  signUpService(user){
    console.log(user);
    return this.http.post("https://7r5gc1m2ik.execute-api.us-east-1.amazonaws.com/dev/signup",JSON.stringify(user)).pipe(
      catchError(this.userServiceError)
    );
  }

  // Http call to signin and fetch user records
  signInService(email,password,role){
    return this.http.get(`https://ef0ur0pldc.execute-api.us-east-1.amazonaws.com/dev/signin?email=${email}&password=${password}&role=${role}`).pipe(
      catchError(this.userServiceError)
    );
  }

  // Error throw function
  userServiceError(error: HttpErrorResponse) {
    return throwError(error);
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()

export class PracteraAuthService {
  user: User;
 AUTH_END_POINT:string = 'https://api.practera.com/api/auth.json';
 APP_KEY:string = '02c87fe784';
 constructor(private http: Http){

 }
 userAuth(email, password) {
   console.log("here?");
   let headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');
   headers.append('appkey', this.APP_KEY);

   let urlSearchParams = new URLSearchParams();
   urlSearchParams.append('data[User][email]', email);
   urlSearchParams.append('data[User][password]', password);

   let userNamePassWord = urlSearchParams.toString();

   return this.http.post(this.AUTH_END_POINT, userNamePassWord, {headers: headers});
   
 }
 processLogIn(data?){
   this.setLoginUser(data);
 }

 setLoginUser(user){
   let practeraUser = {
     'apikey': user.data.apikey,
     'timelines':user.data.Timelines
   }
   window.localStorage.setItem("practeraUser", JSON.stringify(practeraUser));
 }
 logError(error) {
   console.error(error);
   return Observable.throw(error.json().error || 'Server error');
 }

 setActiveUser(user: User){
  this.user  = user;
 }

 getActiveUser(){
   return this.user;
 }
}
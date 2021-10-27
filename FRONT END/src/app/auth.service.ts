import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,BehaviorSubject} from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
    
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem('userToken') !=null){
      this.saveCurrentUser()
    }

   }

  currentUser=new BehaviorSubject(null); 
// registration  
  register(formData:any):Observable<any>{ 
   return this._HttpClient.post('http://localhost:3003/addUser',formData);
  }
  
// log in  
  login(formData: any): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:3003/login',
      formData
    );
  }
// SAVE CURRENT USER TO AUTH GARD 
  saveCurrentUser(){
    let token:any=localStorage.getItem('userToken');
    this.currentUser.next(jwtDecode(token));
    console.log(this.currentUser.getValue())
  }
//log out
  logout(){
    this.currentUser.next(null);
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']) 

  }  
// log in  
getUserlogin(formData: any): Observable<any> {
  return this._HttpClient.post(
    'http://localhost:3003/login',
    formData
  );
}  
// Update profile  
updateProfile(id: any, data: any): Observable<any> {
  return this._HttpClient.put(
    `http://localhost:3003/updateUser/${id}`,
    data
  );
} 
// GET User Login Data by id
getUserData(id:any):Observable<any>{
  return this._HttpClient.get(`http://localhost:3003/getSingleUser/${id}`)
}


}

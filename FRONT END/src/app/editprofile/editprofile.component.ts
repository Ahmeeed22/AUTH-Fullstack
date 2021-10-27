import { Component, OnInit ,OnDestroy} from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit ,OnDestroy {
  user: any = {}
  email: any = localStorage.getItem('email');
  id: any = localStorage.getItem('id'); 
  age: any = localStorage.getItem('age');
  name: any = localStorage.getItem('name');

  constructor(private _Router: Router, private _AuthService: AuthService) {}

  error: string = ''
  updateForm:any;
  submitUpdateProfile:any;
  sub:any;
  ngOnInit(): void {

        // validation by using reactive forms
        this.updateForm = new FormGroup({
          name: new FormControl(this.name, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ]),
          age: new FormControl(this.age, [
            Validators.required,
            Validators.min(12),
            Validators.max(50),
          ]),
          email: new FormControl(this.email, [Validators.required, Validators.email]),
        })

        // update profile method
      this.submitUpdateProfile=(name:any,age:any,email:any)=> {
        let data = {
          name: name,
          email: email,
          age: age,
        };
       this.sub= this._AuthService.updateProfile(this.id,data).subscribe((res) => {
          if (res.message == 'success') {
            localStorage.setItem('userToken',res.token)


            localStorage.setItem('email',res.email);
            localStorage.setItem('id',res.id); 
            localStorage.setItem('age',res.age);
            localStorage.setItem('name',res.name);


            this._AuthService.saveCurrentUser();
            this._Router.navigate(['/profile']);
          } else {
            this.error = res.message
          }
        })
      }


    }
  
    ngOnDestroy():void
    {
      this.sub.unsubscribe();
    }
}





// import { Component, OnInit } from '@angular/core'
// import { FormGroup, FormControl, Validators } from '@angular/forms'
// import { Router } from '@angular/router'
// import { AuthService } from '../auth.service'
// import jwtDecode from 'jwt-decode'

// @Component({
//   selector: 'app-editprofile',
//   templateUrl: './editprofile.component.html',
//   styleUrls: ['./editprofile.component.css'],
// })
// export class EditprofileComponent implements OnInit {
//   user: any = {}
//   email: any = localStorage.getItem('email');
//   id: any = localStorage.getItem('id'); 
//   age: any = localStorage.getItem('age');
//   name: any = localStorage.getItem('name');

//   constructor(private _Router: Router, private _AuthService: AuthService) {}

//   error: string = ''
//   ngOnInit(): void {}
//   // validation by using reactive forms
//   updateForm = new FormGroup({
//     name: new FormControl(this.name, [
//       Validators.required,
//       Validators.minLength(3),
//       Validators.maxLength(20),
//     ]),
//     age: new FormControl(this.age, [
//       Validators.required,
//       Validators.min(12),
//       Validators.max(50),
//     ]),
//     email: new FormControl(this.email, [Validators.required, Validators.email]),
//   })
//   // update profile method
//   submitUpdateProfile(name:any,age:any,email:any) {
//     let data = {
//       name: name,
//       email: email,
//       age: age,
//     };
//     this._AuthService.updateProfile(this.id,data).subscribe((res) => {
//       if (res.message == 'success') {
//         localStorage.setItem('userToken',res.token)


//         localStorage.setItem('email',res.email);
//         localStorage.setItem('id',res.id); 
//         localStorage.setItem('age',res.age);
//         localStorage.setItem('name',res.name);


//         this._AuthService.saveCurrentUser();
//         this._Router.navigate(['/profile']);
//       } else {
//         this.error = res.message
//       }
//     })
//   }
// }

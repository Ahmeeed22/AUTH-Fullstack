import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit ,OnDestroy {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  error: string = '';
  loginForm:any;
  submitLoginForm:any;
   sub:any;

  ngOnInit(): void {
     // validation
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });


    this.submitLoginForm=(loginForm: FormGroup) =>{
      this.sub=  this._AuthService.login(loginForm.value).subscribe((response) => {
        if (response.message == 'success') {
          localStorage.setItem('email',response.email)
          localStorage.setItem('age',response.age)
          localStorage.setItem('name',response.name)
          localStorage.setItem('id',response.id)
  
          Swal.fire({
            title: 'Are you sure Sure Of Login Data?',
            text: 'You will not be able to recover this file!', 
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Login it!',
            cancelButtonText: 'No, keep it',
          }).then((result) => {
            if (result.value) { 
              // this._AuthService.saveCurrentUser();
              Swal.fire(
                'Logined!',
                'Your imaginary file has been Logined.',
                'success'
              );
              localStorage.setItem('userToken',response.token);
              this._AuthService.saveCurrentUser();
              this._Router.navigate(['/home']);
  
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
          });
        } else {
          this.error = response.message;
        }
      });
    }
  }
 

 
 

  ngOnDestroy():any{
    this.sub.unsubscribe();
  }
 
}

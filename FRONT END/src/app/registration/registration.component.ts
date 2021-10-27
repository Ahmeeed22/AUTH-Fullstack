import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(private _Router: Router, private _AuthService: AuthService) {}
  error: string = '';
  pw: string = '';
  cpw: string = '';
  // validation by using reactive forms
  registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(12), 
      Validators.max(50),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{3,11}$'),
    ]),
    password_confirmation: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{3,11}$'),
    ]),
  });

  // Registeration method
  submitRegisterForm(registerForm: FormGroup) {
    this._AuthService.register(registerForm.value).subscribe((res) => {
      // console.log(res);
      if (res.message == 'success') {
        this._Router.navigate(['/login']);
      } else {
        this.error = res.message;
      }
    });
  }

  ngOnInit(): void {}
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, IUser } from 'src/app/model/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: ILogin = {
    user: {
      id: 0,
      userName: '',
      password: '',
    },
    status: false,
    message: '',
  };
  loginForm!: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // updateValue(event: any, type: string) {
  //   // const value = event.target.value;
  //   // if (type === 'userName') {
  //   //   this.loginData.user.userName = value;
  //   // } else if (type === 'password') {
  //   //   this.loginData.user.password = value;
  //   // }
  // }
  insideUpdate() {
    const formData = this.loginForm.value;
    this.loginData.user.userName = this.loginForm.get('name')?.value;
    this.loginData.user.password = this.loginForm.get('password')?.value;
  }

 
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form submitted:', formData);
    
      this.loginData.user.userName = this.loginForm.get('name')?.value;
      this.loginData.user.password = this.loginForm.get('password')?.value;
      // this.loginData.status = true;
      // this.loginData.message = 'success';
      console.log('Form submitted:', this.loginData);
      if (
        this.loginData.user.userName == 'admin' &&
        this.loginData.user.password == 'admin'
      ) {
        this.router.navigate(['book-list']);
      }
      else {
        this.invalidLogin = true;
      }
    
    }
  }
}

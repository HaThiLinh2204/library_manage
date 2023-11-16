import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, IUser } from 'src/app/model/user.model';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/auth.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
  ],
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
  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  // updateValue(event: any, type: string) {
  //   // const value = event.target.value;
  //   // if (type === 'userName') {
  //   //   this.loginData.user.userName = value;
  //   // } else if (type === 'password') {
  //   //   this.loginData.user.password = value;
  //   // }
  // }
  // insideUpdate() {
  //   const formData = this.loginForm.value;
  //   this.loginData.user.userName = this.loginForm.get('name')?.value;
  //   this.loginData.user.password = this.loginForm.get('password')?.value;
  // }

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
        this.authService.isLoggedIn = true;
        this.router.navigate(['book-list']);
      } else {
        this.invalidLogin = true;
      }
    }
  }

  get nameControl() {
    return this.loginForm.controls['name'];
  }
}

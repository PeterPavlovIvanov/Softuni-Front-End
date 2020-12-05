import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { emailValidator, rePasswordValidatorFactory } from '../validators';
import { User } from '../interfaces/user';
import { fade } from '../animations/fadeAnimation';
import { environment } from 'src/environments/environment';

const apiURL = environment.apiUrl;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    fade
  ]
})
export class RegisterComponent implements OnInit {
  @ViewChild('f')
  ngForm!: NgForm;
  form: FormGroup;

  constructor(private http: HttpClient, private router: Router,
    private fb: FormBuilder,) {
    const passwordControl = this.fb.control('test-password', [Validators.required, Validators.minLength(4)]);
    this.form = this.fb.group({
      email: ['test@email.bg', [Validators.required, Validators.email, emailValidator], []],
      username: ['test-username', [Validators.required, Validators.minLength(4)], []],
      password: passwordControl,
      confirmPassword: ['test-password', [Validators.required, Validators.minLength(4), rePasswordValidatorFactory(passwordControl)]],
    });
  }
  ngOnInit(): void {
  }


  onSubmit(): void {
    const content = this.ngForm.value;

    if (!this.form.controls.confirmPassword.errors && !this.form.controls.password.errors &&
      !this.form.controls.username.errors && !this.form.controls.email.errors) {

      let user: User = {
        username: content.username,
        email: content.email,
        password: content.password,
        twits: [],
      }

      this.http.post(`${apiURL}/users`, user)
        .subscribe(
          res => this.router.navigate(['/user/login']),
          err => {
            if (err.error.message == 'User Name already exists') {
              alert(`Username ${user.username} is taken.`);
            }
            if (err.error.message == 'Email already exists') {
              alert(`Email ${user.email} has a registration.`);
            }
          },
        );

    } else {
      console.log("Form incorrect!")
      return;
    }

  }

}

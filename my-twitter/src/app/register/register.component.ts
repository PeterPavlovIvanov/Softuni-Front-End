import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('f')
  form!: NgForm;

  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  constructor(private http: HttpClient, private router: Router) { }
  ngAfterViewInit(): void { }

  onSubmit(): void {
    const content = this.form.value;
    console.log(content.password + " " + content.confirmPassword);
    if (content.password == content.confirmPassword) {
      this.http.post('https://dark-twitter-fe5f2.firebaseio.com/users.json', {
        email: content.email,
        password: content.password,
        username: content.username,
      }).subscribe(responseData => {
        console.log(responseData);
      });
      this.router.navigate(["/user/login"]);
    } else {
      //TODO:
      console.log("Passwords do not match!")
      return;
    }
  }
}

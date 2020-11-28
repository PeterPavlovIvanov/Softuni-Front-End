import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

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

  emailChecked: boolean;
  usernameChecked: boolean;

  constructor(private http: HttpClient, private router: Router,) { }
  ngAfterViewInit(): void { }

  onSubmit(): void {
    const content = this.form.value;

    let validations = { pass: false, uname: false, mail: false };

    if ((content.password === content.confirmPassword) && content.password !== "" && content.password != null) {
      validations.pass = true;
    }

    // this.http.get<User[]>('https://dark-twitter-fe5f2.firebaseio.com/users.json')
    //   .subscribe(responseData => {
    //     for (const User in responseData) {
    //       if (content.username == responseData[User].username) {
    //         this.usernameChecked = false;
    //       }
    //     }
    //     this.usernameChecked = true;
    //   });
    // this.http.get<User[]>('https://dark-twitter-fe5f2.firebaseio.com/users.json')
    //   .subscribe(responseData => {
    //     for (const User in responseData) {
    //       if (content.email == responseData[User].email) {
    //         this.emailChecked = false;
    //       }
    //     }
    //     this.emailChecked = true;
    //   });

    if (content.username != null && content.username !== "") {
      validations.uname = true;
    }
    if (content.email != null && content.email !== "") {
      validations.mail = true;
    }

    if (validations.mail && validations.pass && validations.uname) {
      this.http.post('https://dark-twitter-fe5f2.firebaseio.com/users.json', {
        email: content.email,
        password: content.password,
        username: content.username,
      })
        .subscribe(responseData => {
          //console.log(responseData);
        });
      this.router.navigate(["/user/login"]);
    } else {
      //TODO:
      console.log("Form incorrect!")
      return;
    }
  }

}

import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

  emailChecked: boolean;
  usernameChecked: boolean;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {

  }
  ngAfterViewInit(): void { }

  onSubmit(): void {
    const content = this.form.value;

    let validations = { pass: false, uname: false, mail: false };

    if ((content.password === content.confirmPassword) && content.password !== "" && content.password != null) {
      validations.pass = true;
    }

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

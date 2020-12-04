import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { fade } from '../animations/fadeAnimation';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    fade
  ]
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('f')
  ngForm!: NgForm;
  form: FormGroup;

  username: string | undefined;
  password: string | undefined;

  constructor(public userService: UserService, private fb: FormBuilder) {
    const passwordControl = this.fb.control('test-password', [Validators.required, Validators.minLength(4)]);
    this.form = this.fb.group({
      username: ['test-username', [Validators.required, Validators.minLength(4)], []],
      password: passwordControl,
    });
  }

  ngAfterViewInit(): void {
  }

  onSubmit() {
    let passwordCorrect = this.form.controls.password.errors;
    let usernameCorrect = this.form.controls.username.errors;
    const content = this.ngForm.value;
    this.userService.login(content, usernameCorrect, passwordCorrect);
  }

}

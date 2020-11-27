import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('f')
  form!: NgForm;

  username: string | undefined;
  password: string | undefined;

  constructor(public userService: UserService) { }
  ngAfterViewInit(): void {
  }

  onSubmit() {
    //TODO: Login
    const content = this.form.value;
    this.userService.login(content);
  }

}

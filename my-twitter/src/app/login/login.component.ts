import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() { }
  ngAfterViewInit(): void {
  }
  
  onSubmit(){
    //const content = this.form.value;
    //TODO: Login
    console.dir(this.form.value);
  }
  
}

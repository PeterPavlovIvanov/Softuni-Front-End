import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


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


  constructor() { }
  ngAfterViewInit(): void {

  }

  onSubmit(): void {



    //const content = this.form.value;
    //TODO: Send model to API​ and valitadion
    console.dir(this.form.value);
  }
}

import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { fade } from '../animations/fadeAnimation';
import { Twit } from '../interfaces/twit';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
const apiURL = environment.apiUrl;

@Component({
  selector: 'app-twit-add',
  templateUrl: './twit-add.component.html',
  styleUrls: ['./twit-add.component.css'],
  animations:[
    fade
  ]
})
export class TwitAddComponent implements AfterViewInit {
  @ViewChild('f')
  ngForm!: NgForm;
  form: FormGroup;

  text: string | undefined;

  constructor(private http: HttpClient, private router: Router, private userService: UserService,
    private fb: FormBuilder,) {
    this.form = this.fb.group({
      text: ['this is an example', [Validators.required, Validators.minLength(10), Validators.maxLength(410)], []],
    });
  }
  ngAfterViewInit(): void {
    this.http.get<User[]>(`${apiURL}/users`).subscribe(console.log);
  }

  onSubmit(): void {
    const content = this.ngForm.value;
    let currentTwit = {
      text: content.text,
      username: this.userService.user.username,
      usersLike: [this.userService.user.username],
      usersDislike: [this.userService.user.username],
    };
    if (!this.form.controls.text.errors && this.userService.user !== undefined) {
      this.http.post<Twit[]>(`${apiURL}/twits`, currentTwit)
        .subscribe();

      this.router.navigate(["/home"]);
    } else {
      //TODO:
      console.log("Form incorrect!")
      return;
    }

  }

}

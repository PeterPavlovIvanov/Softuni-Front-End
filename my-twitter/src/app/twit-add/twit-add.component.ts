import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Twit } from '../interfaces/twit';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-twit-add',
  templateUrl: './twit-add.component.html',
  styleUrls: ['./twit-add.component.css']
})
export class TwitAddComponent implements AfterViewInit {
  @ViewChild('f')
  form!: NgForm;

  text: string | undefined;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }
  ngAfterViewInit(): void {

  }

  onSubmit(): void {
    const content = this.form.value;
    if (content.text.length >= 4 && this.userService.user !== null && this.userService.user !== undefined) {
      this.http.post<Twit[]>('https://dark-twitter-fe5f2.firebaseio.com/twits.json', {
        text: content.text,
        likes: 0,
        dislikes: 0,
        user: this.userService.user,
      })
        .subscribe(responseData => {
          //console.log(responseData);
        });
      this.router.navigate(["/home"]);
    } else {
      //TODO:
      console.log("Form incorrect!")
      return;
    }
    //TODO: Send model to API​
  }

}

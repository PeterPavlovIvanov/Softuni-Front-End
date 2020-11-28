import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Twit } from '../interfaces/twit';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-twit',
  templateUrl: './twit.component.html',
  styleUrls: ['./twit.component.css']
})

export class TwitComponent implements OnInit {

  @Input() twit: Twit;
  name: string;
  id: string;

  constructor(private http: HttpClient, private router: Router, ) { }

  ngOnInit(): void {
    this.name = this.twit.user.username;
  }

  openProfile() {
    this.http.get<User[]>("https://dark-twitter-fe5f2.firebaseio.com/users.json")
      .subscribe(responseData => {
        for (const User in responseData) {
          if (this.name === responseData[User].username) {
            this.id = User;
            break;
          }
        }
      });
  }

}

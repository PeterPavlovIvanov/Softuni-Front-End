import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Twit } from '../interfaces/twit';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentTwits: Twit[] = [];
  username: string;
  email: string;
  userId: string;
  isLogged: boolean;

  constructor(private userService: UserService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userId = params['uid'];
        }
      );

    this.http.get<User[]>('https://dark-twitter-fe5f2.firebaseio.com/users.json')
      .subscribe(responseData => {
        this.username = responseData[this.userId].username;
        this.email = responseData[this.userId].email;
      });

    this.http.get<Twit[]>('https://dark-twitter-fe5f2.firebaseio.com/twits.json')
      .subscribe(responseData => {
        for (const Twit in responseData) {
          if (responseData[Twit].username === this.userService.user.username) {
            this.currentTwits.push({ ...responseData[Twit], id: Twit });
          }
        }
      });
  }

}

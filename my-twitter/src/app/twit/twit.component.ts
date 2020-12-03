import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Twit } from '../interfaces/twit';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-twit',
  templateUrl: './twit.component.html',
  styleUrls: ['./twit.component.css']
})

export class TwitComponent implements OnInit {

  @Input() twit: Twit;
  name: string;
  id: string;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.name = this.twit.username;
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
        this.router.navigate([`/user/${this.id}`]);
      });
  }

  like(currentTwit: any) {
    let currentUsername = this.userService.user.username;
    if (currentUsername == currentTwit.username) {
      return;
    }
    let newArr = [];
    currentTwit.usersDislike.forEach(username => {
      if (username !== currentUsername) {
        newArr.push(username);
      }
    })
    currentTwit.usersDislike = newArr;

    if (!currentTwit.usersLike.some(username => username === currentUsername)) {
      currentTwit.usersLike.push(currentUsername);
    }

    this.http.put(`https://dark-twitter-fe5f2.firebaseio.com/twits/${currentTwit.id}.json`
      , currentTwit)
      .subscribe(console.log);
  }

  dislike(currentTwit: any) {
    let currentUsername = this.userService.user.username;
    if (currentUsername == currentTwit.username) {
      return;
    }
    let newArr = [];
    currentTwit.usersLike.forEach(username => {
      if (username !== currentUsername) {
        newArr.push(username);
      }
    })
    currentTwit.usersLike = newArr;

    if (!currentTwit.usersDislike.some(username => username === currentUsername)) {
      currentTwit.usersDislike.push(currentUsername);
    }

    this.http.put(`https://dark-twitter-fe5f2.firebaseio.com/twits/${currentTwit.id}.json`
      , currentTwit)
      .subscribe(console.log);
  }

}

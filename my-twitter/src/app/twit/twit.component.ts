import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Twit } from '../interfaces/twit';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
const apiURL = environment.apiUrl;

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
    this.http.get<User[]>(`${apiURL}/users`)
      .subscribe(responseData => {
        for (const User in responseData) {
          if (this.name === responseData[User].username) {
            this.id = User;
            break;
          }
        }
        this.router.navigate([`/user/profile/${this.name}`]);
      });
  }

  like(currentTwit: any) {
    let userFromService: User = this.userService.storage.getItem("user");
    let currentUsername = userFromService.username;
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
    }else{
      currentTwit.usersLike = currentTwit.usersLike.filter((username) => username != currentUsername);
    }

    this.http.post(`${apiURL}/twits/likeChange/${currentTwit._id}`
      , { username: currentUsername })
      .subscribe(console.log);
  }

  dislike(currentTwit: any) {
    let userFromService: User = this.userService.storage.getItem("user");
    let currentUsername = userFromService.username;
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
    }else{
      currentTwit.usersDislike = currentTwit.usersDislike.filter((username) => username != currentUsername);
    }

    this.http.post(`${apiURL}/twits/dislikeChange/${currentTwit._id}`
      , { username: currentUsername })
      .subscribe(console.log);
  }

}

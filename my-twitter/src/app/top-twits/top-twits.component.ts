import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fade } from '../animations/fadeAnimation';
import { Twit } from '../interfaces/twit';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-top-twits',
  templateUrl: './top-twits.component.html',
  styleUrls: ['./top-twits.component.css'],
  animations: [
    fade
  ]
})
export class TopTwitsComponent implements OnInit {

  currentMostLikedTwits: Twit[] = [];
  currentMostDislikedTwits: Twit[] = [];
  isLogged: boolean;
  topLiked: boolean = true;

  constructor(private userService: UserService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged;


    this.http.get<Twit[]>('https://dark-twitter-fe5f2.firebaseio.com/twits.json')
      .subscribe(responseData => {
        for (const User in responseData) {
          this.currentMostLikedTwits.push(responseData[User]);
          this.currentMostDislikedTwits.push(responseData[User]);
        }
        this.currentMostLikedTwits.sort((a, b) => {
          if (a.usersLike.length > a.usersLike.length) {
            return 1;
          }
          if (a.usersLike.length < b.usersLike.length) {
            return 0;
          }
          return -1;
        });
        this.currentMostDislikedTwits.sort((a, b) => {
          if (a.usersLike.length > a.usersLike.length) {
            return 0;
          }
          if (a.usersLike.length < b.usersLike.length) {
            return 1;
          }
          return -1;
        });
        this.currentMostLikedTwits = this.currentMostLikedTwits.slice(0, 10);
        this.currentMostDislikedTwits = this.currentMostDislikedTwits.slice(0, 10);
      });

  }

  switchMode() {
    this.topLiked = !this.topLiked;
  }

}
// else {
//   if (a.usersLike.length > a.usersLike.length) {
//     return 0;
//   } else if (a.usersLike.length < b.usersLike.length) {
//     return 1;
//   }
//   return -1;
// }
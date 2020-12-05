import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { fade } from '../animations/fadeAnimation';
import { Twit } from '../interfaces/twit';
import { UserService } from '../services/user.service';

const apiURL = environment.apiUrl;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    fade
  ]
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
          this.username = params['username'];
        }
      );
    let ans;
    this.http.get(`${apiURL}/users/${this.username}`)
      .subscribe(resposneUser => {
        ans = resposneUser;
        this.username = ans.user.username;
        this.email = ans.user.email;
        this.currentTwits = ans.twits;
      });
  }

}

import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  email: string;
  userId: string;

  constructor(private userService: UserService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
  }

}

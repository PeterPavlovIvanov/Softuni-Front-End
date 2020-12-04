import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { StorageService } from './storage.service';
const apiURL = environment.apiUrl;

@Injectable()
export class UserService {

  user: User;
  userId: string;
  isLogged: boolean;

  constructor(public storage: StorageService, private http: HttpClient, private router: Router,) {
    this.isLogged = storage.getItem('isLogged');
    this.user = this.storage.getItem('user');
    this.userId = this.storage.getItem('userId');
  }

  login(user: User, passwordCorrect: any, usernameCorrect: any): void {
    let flag = false;

    this.http.get<User[]>(`${apiURL}/users`)
      .subscribe(responseData => {
        for (const User in responseData) {
          if (user.username == responseData[User].username) {
            if (user.password == responseData[User].password) {
              this.user = responseData[User];
              this.userId = User;
              this.isLogged = true;
              this.storage.setItem('isLogged', true);
              this.storage.setItem('user', JSON.stringify(responseData[User]));
              this.storage.setItem('userId', JSON.stringify(User));
              this.router.navigate(["/home"]);
              return;
            } else {
              flag = true;
            }
          }
        }
      });
    if (flag) {
      console.log("Wrong username or password!");
    }
  }

  logout(): void {
    this.user = null;
    this.isLogged = false;
    this.storage.setItem('isLogged', false);
  }
}

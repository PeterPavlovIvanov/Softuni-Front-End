import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { storageFactory, StorageService } from './storage.service';
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

  login(user: User, usernameCorrect: any, passwordCorrect: any): void {

    this.http.post(`${apiURL}/users/login`, user)
      .subscribe(res => {
        let temp: any = res;
        this.isLogged = true;
        this.userId = temp._id;

        this.storage.setItem('isLogged', true);
        this.storage.setItem('user', JSON.stringify(temp));
        this.storage.setItem('userId', temp._id);

        this.router.navigate(["/home"]);
        return;
      },
        err => {
          if (err.error.message === "Wrong Password") {
            alert("Wrong password!");
          } else if (err.error.message === "No Such User") {
            alert("No such username!");
          }
        });

  }

  logout(): void {
    this.user = null;
    this.isLogged = false;
    this.userId = "";
    this.storage.setItem('isLogged', false);
    this.storage.setItem('userId', "");
    this.storage.setItem('user', {username:""});
  }
}

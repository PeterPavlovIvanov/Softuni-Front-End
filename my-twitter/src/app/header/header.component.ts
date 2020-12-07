import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId: string;
  currentUsername: string;
  isInProfile: boolean;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService, private router: Router,) {
  }

  ngOnInit(): void {
    this.userId = this.userService.userId;
    let temp: User = this.userService.storage.getItem("user");
    this.currentUsername = temp.username;
    this.isInProfile = window.location.href.includes('/user/profile/') ? true : false;
  }

  handleLogout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

}

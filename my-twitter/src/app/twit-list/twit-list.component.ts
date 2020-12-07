import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from '../animations/fadeAnimation';
import { Twit } from '../interfaces/twit';
import { TwitService } from '../services/twit.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-twit-list',
  templateUrl: './twit-list.component.html',
  styleUrls: ['./twit-list.component.css'],
  animations:[
    fade
  ]
})
export class TwitListComponent implements OnInit {

  twitList: Twit[] = [];
  isLogged: boolean;
  constructor(private twitService: TwitService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged;
    setTimeout(() => {
      this.twitService.loadTwitList().subscribe(twitList => {
        for (const twit in twitList) {
          this.twitList.push({ ...twitList[twit], id: twit });
        }
      });
    }, 250);
  }


}

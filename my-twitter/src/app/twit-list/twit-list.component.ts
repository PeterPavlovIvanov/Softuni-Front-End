import { Component, OnInit } from '@angular/core';
import { Twit } from '../interfaces/twit';
import { TwitService } from '../services/twit.service';

@Component({
  selector: 'app-twit-list',
  templateUrl: './twit-list.component.html',
  styleUrls: ['./twit-list.component.css']
})
export class TwitListComponent implements OnInit {

  twitList: Twit[] = [];
  constructor(private twitService: TwitService) { }

  ngOnInit(): void {
    this.twitService.loadTwitList().subscribe(twitList => {
      for (const twit in twitList) {
        this.twitList.push(twitList[twit]);
      }
    });
  }


}

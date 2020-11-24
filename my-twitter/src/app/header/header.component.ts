import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get isLogged(): boolean{
    //TODO: actually to get whether a user is logged
    return false;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}

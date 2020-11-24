import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-twit-add',
  templateUrl: './twit-add.component.html',
  styleUrls: ['./twit-add.component.css']
})
export class TwitAddComponent implements AfterViewInit {
  @ViewChild('f')
  form!: NgForm;

  content: string | undefined;

  constructor() { }
  ngAfterViewInit(): void {

  }

  onSubmit(): void {
    //const content = this.form.value;
    //TODO: Send model to API​
    console.dir(this.form.value);
  }

}

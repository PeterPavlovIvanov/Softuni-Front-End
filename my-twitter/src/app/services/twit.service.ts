import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Twit } from '../interfaces/twit';

@Injectable({
  providedIn: 'root'
})
export class TwitService {

  constructor(private http: HttpClient) { }

  loadTwitList(): Observable<Twit[]> {
    return this.http.get<Twit[]>('https://dark-twitter-fe5f2.firebaseio.com/twits.json');
  }
}

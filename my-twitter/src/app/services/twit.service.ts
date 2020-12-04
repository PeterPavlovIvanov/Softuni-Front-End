import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Twit } from '../interfaces/twit';

const apiURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TwitService {

  constructor(private http: HttpClient) { }

  loadTwitList(): Observable<Twit[]> {
    return this.http.get<Twit[]>(`${apiURL}/twits`);
  }
}

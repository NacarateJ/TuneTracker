import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private iTunesApiUrl =
    'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

  // Dependency injection - makes the  HttpClient available for making HTTP requests
  constructor(private http: HttpClient) {}

  getData() {
    return this.http
      .get(this.iTunesApiUrl)
      .pipe(tap((response) => console.log('API Response SERVICE', response)));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private iTunesApiUrl =
    'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

  public search = new BehaviorSubject<string>("");

  // Dependency injection - makes the  HttpClient available for making HTTP requests
  constructor(private http: HttpClient) {}

  getData() {
    return this.http
      .get(this.iTunesApiUrl)
  }
}

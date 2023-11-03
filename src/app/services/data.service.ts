import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private iTunesApiUrl =
    'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

  public search = new BehaviorSubject<string>('');

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error has occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  // Dependency injection - makes the  HttpClient available for making HTTP requests
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.iTunesApiUrl).pipe(catchError(this.handleError));
  }
}

import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  fetchedData$: Observable<any>;

  constructor(private dataService: DataService) {
    this.fetchedData$ = this.dataService.getData().pipe(
      tap((data) => {
        console.log('API Response HOME', data);
      })
    );
  }
}

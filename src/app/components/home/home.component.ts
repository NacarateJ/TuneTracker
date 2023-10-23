import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  fetchedData$: Observable<any>;
  searchKey: string = '';
  noResultsMessage: string =
    'Sorry, there are no albums that match your search';

  // Dependency injection - allows the component to use the service to fetch data
  constructor(private dataService: DataService) {
    this.fetchedData$ = this.dataService.getData();
  }

  redirectToAlbum(albumLink: string) {
    window.open(albumLink, '_blank');
  }

  ngOnInit() {
    this.dataService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
}

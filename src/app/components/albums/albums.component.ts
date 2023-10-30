import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HomeStateService } from 'src/app/services/home-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  fetchedData$: Observable<any>;
  searchKey: string = '';
  noResultsMessage: string =
    'Sorry, there are no albums that match your search';
  showAlbums: boolean = false;

  // Dependency injection - allows the component to use the service to fetch data
  constructor(
    private dataService: DataService,
    private homeStateService: HomeStateService
  ) {
    this.fetchedData$ = this.dataService.getData();
  }

  redirectToAlbum(albumLink: string) {
    window.open(albumLink, '_blank');
  }

  ngOnInit() {
    this.homeStateService.showAlbums$.subscribe((showAlbums) => {
      this.showAlbums = showAlbums;
    });

    this.dataService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
}

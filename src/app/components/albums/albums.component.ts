import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlbumsStateService } from 'src/app/services/albums-state.service';
import { Observable } from 'rxjs';

interface Album {
  id: {
    attributes: {
      'im:id': string;
    };
  };
  [key: string]: any;
  originalIndex?: number;
}

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  fetchedData$: Observable<any> = new Observable<any>();
  searchKey: string = '';
  noResultsMessage: string =
    'Sorry, there are no albums that match your search';
  showAlbums: boolean = false;
  favoriteAlbums: { [key: string]: number } = {};
  albums: any[] = [];

  // Dependency injection - allows the component to use the service to fetch data
  constructor(
    private dataService: DataService,
    private albumsStateService: AlbumsStateService
  ) {}

  redirectToAlbum(albumLink: string) {
    window.open(albumLink, '_blank');
  }

  ngOnInit() {
    this.fetchedData$ = this.dataService.getData();

    this.albumsStateService.showAlbums$.subscribe((showAlbums) => {
      this.showAlbums = showAlbums;
    });

    this.dataService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
}

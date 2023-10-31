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

  sortAlbums() {
    // Sort by favorites and then by the timestamp or original index
    this.albums.sort((a, b) => {
      const aId = a.id.attributes['im:id'];
      const bId = b.id.attributes['im:id'];
      const aIsFavorite = this.favoriteAlbums[aId];
      const bIsFavorite = this.favoriteAlbums[bId];

      if (aIsFavorite && bIsFavorite) {
        return bIsFavorite - aIsFavorite;
      }
      if (aIsFavorite && !bIsFavorite) {
        return -1;
      }
      if (!aIsFavorite && bIsFavorite) {
        return 1;
      }
      return a.originalIndex - b.originalIndex;
    });
  }

  toggleFavorite(album: any) {
    const albumId = album.id.attributes['im:id'];
    if (this.favoriteAlbums[albumId]) {
      delete this.favoriteAlbums[albumId];
    } else {
      this.favoriteAlbums[albumId] = new Date().getTime();
    }
    this.sortAlbums();
  }

  redirectToAlbum(albumLink: string) {
    window.open(albumLink, '_blank');
  }

  ngOnInit() {
    this.fetchedData$ = this.dataService.getData();

    this.fetchedData$.subscribe((data) => {
      this.albums = data.feed.entry.map((entry: Album, index: number) => ({
        ...entry,
        originalIndex: index,
      }));
      this.sortAlbums();
    });

    this.albumsStateService.showAlbums$.subscribe((showAlbums) => {
      this.showAlbums = showAlbums;
    });

    this.dataService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
}

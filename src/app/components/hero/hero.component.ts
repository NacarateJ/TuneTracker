import { Component } from '@angular/core';
import { AlbumsStateService } from 'src/app/services/albums-state.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  constructor(private AlbumsStateService: AlbumsStateService) {}

  showAlbums() {
    this.AlbumsStateService.setShowAlbums(true);
    this.scrollToAlbums();
  }

  private scrollToAlbums() {
    setTimeout(() => {
      const albumsComponent = document.getElementById('albumsComponent');
      if (albumsComponent) {
        window.scrollTo({
          top: albumsComponent.offsetTop,
          behavior: 'smooth',
        });
      }
    }, 100);
  }
}

import { Component } from '@angular/core';
import { HomeStateService } from 'src/app/services/home-state.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  constructor(private HomeStateService: HomeStateService) {}

  showAlbums() {
    this.HomeStateService.setShowAlbums(true);
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

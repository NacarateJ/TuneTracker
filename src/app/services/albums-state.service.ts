import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsStateService {
  private showAlbumsComponent = new BehaviorSubject<boolean>(false);

  showAlbums$: Observable<boolean> = this.showAlbumsComponent.asObservable();

  setShowAlbums(value: boolean) {
    this.showAlbumsComponent.next(value);
  }
}

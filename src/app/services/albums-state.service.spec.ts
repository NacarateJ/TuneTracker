import { TestBed } from '@angular/core/testing';
import { AlbumsStateService } from './albums-state.service';

describe('AlbumsStateService', () => {
  let service: AlbumsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default showAlbums$ to false', (done) => {
    service.showAlbums$.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should emit true when setShowAlbums is called with true', (done) => {
    service.setShowAlbums(true);
    service.showAlbums$.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should emit false when setShowAlbums is called with false', (done) => {
    // This is to change the state if it's already true.
    service.setShowAlbums(false);
    service.showAlbums$.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });
});

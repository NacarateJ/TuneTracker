import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { AlbumsStateService } from 'src/app/services/albums-state.service';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let albumsStateServiceSpy: jasmine.SpyObj<AlbumsStateService>;

  beforeEach(() => {
    // Create a spy object with a setShowAlbums method
    albumsStateServiceSpy = jasmine.createSpyObj('AlbumsStateService', [
      'setShowAlbums',
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      providers: [
        { provide: AlbumsStateService, useValue: albumsStateServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setShowAlbums with true when showAlbums is called', () => {
    component.showAlbums();
    expect(albumsStateServiceSpy.setShowAlbums).toHaveBeenCalledWith(true);
  });

  it('should scroll to albums section when showAlbums is called', (done) => {
    // Set up a spy on the window.scrollTo method
    spyOn(window, 'scrollTo');

    // Create a dummy element to simulate the albumsComponent
    const dummyAlbumsComponent = document.createElement('div');
    dummyAlbumsComponent.id = 'albumsComponent';
    document.body.appendChild(dummyAlbumsComponent);

    component.showAlbums();

    // Since scrollTo is called after a timeout, use setTimeout to check the expectation
    setTimeout(() => {
      expect(window.scrollTo).toHaveBeenCalled();
      // Clean up the dummy element
      document.body.removeChild(dummyAlbumsComponent);
      done(); // End the async test
    }, 150); // setTimeout duration should be slightly longer than the scrollTo timeout
  });
});

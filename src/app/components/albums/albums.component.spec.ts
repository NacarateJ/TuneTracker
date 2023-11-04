import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import { DataService } from 'src/app/services/data.service';
import { AlbumsStateService } from 'src/app/services/albums-state.service';
import { of, Observable, throwError } from 'rxjs';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(() => {
    consoleErrorSpy = spyOn(console, 'error');
  });

  // Define the structure of the mocked services
  interface DataServiceConfig {
    getData: () => Observable<any>;
    search: Observable<string>;
  }

  interface AlbumsStateServiceConfig {
    showAlbums$: Observable<boolean>;
  }

  function configureTestingModule(
    dataServiceConfig: DataServiceConfig,
    albumsStateServiceConfig: AlbumsStateServiceConfig
  ) {
    TestBed.configureTestingModule({
      declarations: [AlbumsComponent],
      providers: [
        { provide: DataService, useValue: dataServiceConfig },
        { provide: AlbumsStateService, useValue: albumsStateServiceConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    configureTestingModule(
      { getData: () => of([]), search: of('') },
      { showAlbums$: of(false) }
    );
    expect(component).toBeTruthy();
  });

  it('should handle errors when fetchedData$ fails', () => {
    configureTestingModule(
      {
        getData: () => throwError(() => new Error('Error fetching data')),
        search: of(''),
      },
      { showAlbums$: of(false) }
    );

    expect(component.hasError).toBeTrue();
    expect(component.errorMessage).toBe(
      'Failed to fetch albums. Please try again later.'
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching data: ',
      jasmine.any(Error)
    );
  });

  it('should handle errors in showAlbums$ subscription', () => {
    configureTestingModule(
      { getData: () => of([]), search: of('') },
      { showAlbums$: throwError(() => new Error('Error with showAlbums$')) }
    );

    expect(component.hasError).toBeTrue();
    expect(component.errorMessage).toBe(
      'An error occurred while managing albums visibility.'
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should handle errors in search subscription', () => {
    configureTestingModule(
      {
        getData: () => of([]),
        search: throwError(() => new Error('Error with search')),
      },
      { showAlbums$: of(false) }
    );

    expect(component.hasError).toBeTrue();
    expect(component.errorMessage).toBe(
      'An error occurred while handling search functionality.'
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

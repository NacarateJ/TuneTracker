import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import { DataService } from 'src/app/services/data.service';
import { AlbumsStateService } from 'src/app/services/albums-state.service';
import { of, Observable } from 'rxjs';

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
    expect(component).toBeTruthy();
  });
});

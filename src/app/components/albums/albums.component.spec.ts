import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import { DataService } from 'src/app/services/data.service';
import { AlbumsStateService } from 'src/app/services/albums-state.service';
import { of } from 'rxjs';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(() => {
    consoleErrorSpy = spyOn(console, 'error');
  });

  // Create mock services
  const dataServiceStub = {
    getData: () => of([]),
    search: of(''),
  };

  const albumsStateServiceStub = {
    showAlbums$: of(false),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumsComponent],
      providers: [
        { provide: DataService, useValue: dataServiceStub },
        { provide: AlbumsStateService, useValue: albumsStateServiceStub },
      ],
    });
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import { DataService } from 'src/app/services/data.service';
import { HomeStateService } from 'src/app/services/home-state.service';
import { of } from 'rxjs';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  // Create mock services
  const dataServiceStub = {
    getData: () => of([]),
    search: of(''),
  };

  const homeStateServiceStub = {
    showHome$: of(false),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumsComponent],
      providers: [
        { provide: DataService, useValue: dataServiceStub },
        { provide: HomeStateService, useValue: homeStateServiceStub },
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

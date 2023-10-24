import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DataService } from 'src/app/services/data.service';
import { HomeStateService } from 'src/app/services/home-state.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
      declarations: [HomeComponent],
      providers: [
        { provide: DataService, useValue: dataServiceStub },
        { provide: HomeStateService, useValue: homeStateServiceStub },
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

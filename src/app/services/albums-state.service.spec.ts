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
});

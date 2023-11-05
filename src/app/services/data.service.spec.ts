import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getData should return data with titles, artist names, and categories on success', () => {
    const mockAlbumsData = {
      feed: {
        entry: [
          {
            title: {
              label: 'Equal Strain On All Parts - Jimmy Buffett',
            },
            category: {
              attributes: {
                term: 'Rock',
              },
            },
            'im:artist': {
              label: 'Jimmy Buffett',
            },
          },
          {
            title: {
              label: 'Another Album Title - Another Artist',
            },
            category: {
              attributes: {
                term: 'Pop',
              },
            },
            'im:artist': {
              label: 'Another Artist',
            },
          },
        ],
      },
    };

    service.getData().subscribe((data: any) => {
      expect(data).toEqual(
        jasmine.objectContaining({
          feed: jasmine.objectContaining({
            entry: jasmine.any(Array),
          }),
        })
      );

      // Check if each entry has a title, artist, and category
      data.feed.entry.forEach((album: any) => {
        expect(album).toEqual(
          jasmine.objectContaining({
            title: jasmine.objectContaining({ label: jasmine.any(String) }),
            category: jasmine.objectContaining({
              attributes: jasmine.objectContaining({
                term: jasmine.any(String),
              }),
            }),
            'im:artist': jasmine.objectContaining({
              label: jasmine.any(String),
            }),
          })
        );
      });
    });

    const req = httpTestingController.expectOne(service['iTunesApiUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush(mockAlbumsData);
  });

  it('getData should handle errors', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    service.getData().subscribe({
      next: (data) => fail('should have failed with the 404 error'),
      error: (error) => expect(error).toContain('Server returned code: 404'),
      complete: () => fail('The request should not complete successfully'),
    });

    const req = httpTestingController.expectOne(service['iTunesApiUrl']);
    req.flush('Something went wrong', errorResponse);
  });
});

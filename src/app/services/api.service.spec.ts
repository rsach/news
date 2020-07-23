import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  // let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be created', inject(
    [HttpTestingController, ApiService],
    (httpMock: HttpTestingController, service: ApiService) => {
      const data = {
        hits: [],
        page: 0,
        nbHits: 0,
        nbPages: 0,
        hitsPerPage: 0,
        processingTimeMS: 500,
        query: '',
        params: ''
      };
      service.get({ page: 0 }).subscribe(res => {
        expect(res).toBe(data);
      });
      const req = httpMock.expectOne(
        'http://hn.algolia.com/api/v1/search?page=0'
      );
      expect(req.request.method).toEqual('GET');

      req.flush(data);
    }
  ));
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewsApiResponse } from '../model/news';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(params): Observable<INewsApiResponse> {
    return this.http.get(`https://hn.algolia.com/api/v1/search`, {
      params
    }) as Observable<INewsApiResponse>;
  }
}

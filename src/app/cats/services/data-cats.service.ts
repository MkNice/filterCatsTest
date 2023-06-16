import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICat } from '../interfaces/cat.interface';
import { ICatBreed } from '../interfaces/cat-breed.interface';
import { IParams } from '../interfaces/params.interface';

@Injectable({
  providedIn: 'root'
})

export class DataCatsService {

  constructor(private http: HttpClient) { }

  public getCatsWithBreeds(): Observable<[ICat[], ICatBreed[]]> {
    const URL_CATS = `images/search?limit=${environment.DEFAULT_AMOUNT_CATS}`;
    const URL_BREEDS = `breeds/`;

    const cats = this.http.get<ICat[]>(URL_CATS);
    const breeds = this.http.get<ICatBreed[]>(URL_BREEDS);

    return forkJoin([cats, breeds]);
  }

  public getCatsByBreed(params: IParams): Observable<ICat[]> {
    const URL = `images/search?limit=${params.countCats}`;
    let breedQuerry = '';

    if (params.breedCat) {
      breedQuerry = `&breed_ids=${params.breedCat}`;
    }
    return this.http.get<ICat[]>(`${URL}${breedQuerry}`);
  }
}
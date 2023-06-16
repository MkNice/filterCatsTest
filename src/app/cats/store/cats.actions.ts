import { ICatBreed } from '../interfaces/cat-breed.interface';
import { ICat } from '../interfaces/cat.interface';
import { IParams } from '../interfaces/params.interface';

export class GetData {
  static readonly type = '[Cats] Get Data';
}

export class GetDataSuccess {
  static readonly type = '[Cats] Get Data - Success';

  constructor(public catsAndBreeds: [ICat[], ICatBreed[]]) {}
}

export class GetCatsByBreed {
  static readonly type = '[Cats] Get Cats By Breed';

  constructor(public params: IParams) {}
}

export class GetCatsByBreedSuccess {
  static readonly type = '[Cats] Get Cats By Breed - Success';

  constructor(public cats: ICat[]) {}
}

export class GetCatsError {
  static readonly type = '[Cats] Get Cats Error';

  constructor(public error: string) {}
}

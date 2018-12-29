import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PhotoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotoProvider {

  //public photos: Photo[]=[];

  constructor(public http: HttpClient) {
    console.log('Hello PhotoProvider Provider');
  }

  /*class Photo{
    data: any;
  }*/

}

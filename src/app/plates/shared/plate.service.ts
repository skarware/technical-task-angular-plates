import { Injectable } from '@angular/core';
import { Plate } from './plate.model';

// import mock-data until back-end part is build
import { PLATES } from './mock-plates';


@Injectable({
  providedIn: 'root'
})
export class PlateService {

  constructor() {
  }

  // For time being let us return mock up data
  getPlates(): Promise<Plate[]> {
    return Promise.resolve(PLATES);
  }
  // getPlates(): Plate[] {
  //   return PLATES;
  // }
}

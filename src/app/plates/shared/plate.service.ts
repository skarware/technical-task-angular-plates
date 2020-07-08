import { Injectable } from '@angular/core';
import { Plate } from './plate.model';

// import mock-data until back-end part is build
import { PLATES } from './mock-plates';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  // For time being let us return mock up data from PLATES
  private plates: Plate[] = PLATES;
  private platesSubject: Subject<Plate[]> = new Subject<Plate[]>();

  // for time being until database is connected
  private currentId = 10;

  constructor() {
  }

  getPlates(): Promise<Plate[]> {
    return Promise.resolve([...this.plates]);
  }

  getPlatesSubjectAsObservable(): Observable<Plate[]> {
    return this.platesSubject.asObservable();
  }

  addPlateRecord(name: string, surname: string, plateNr: string): void {
    const plate: Plate = {
      id: this.currentId + 1,
      name,
      surname,
      plateNr
    };
    this.plates.push(plate);
    this.platesSubject.next([...this.plates]);
  }
}

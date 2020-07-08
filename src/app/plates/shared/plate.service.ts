import { Injectable, OnDestroy } from '@angular/core';
import { Plate } from './plate.model';

// import mock-data until back-end part is build
import { PLATES } from './mock-plates';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlateService implements OnDestroy {

  constructor() {
  }

  // For time being let us return mock up data from PLATES
  private plates: Plate[] = PLATES;
  private platesChanges: Subject<Plate[]> = new Subject<Plate[]>();

  // for time being until database is connected
  private currentId = 10;

  getPlates(): Promise<Plate[]> {
    return Promise.resolve([...this.plates]);
  }

  getPlatesChanges(): Observable<Plate[]> {
    return this.platesChanges.asObservable();
  }

  addPlateRecord(name: string, surname: string, plateNr: string): void {
    const plate: Plate = {
      id: this.currentId + 1,
      name,
      surname,
      plateNr
    };
    this.plates.push(plate);
    this.platesChanges.next([...this.plates]);
  }

  ngOnDestroy(): void {
    this.platesChanges.complete();
  }
}

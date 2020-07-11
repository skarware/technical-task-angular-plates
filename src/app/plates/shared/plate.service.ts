import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Plate } from './plate.model';
import { HttpClient } from '@angular/common/http';

const BACKEND_HOST_URL = 'http://localhost:3000';
const API_PATH = '/api/plates';

@Injectable({
  providedIn: 'root'
})
export class PlateService implements OnDestroy {
  // Inject HttpClient
  constructor(private http: HttpClient) {
  }

  // Initialize plates array as empty before fetching data from dataSource
  private plates: Plate[] = [];

  // Initialize Observable to multicast changes on this.plates data
  private platesChanges: Subject<Plate[]> = new Subject<Plate[]>();

  getPlates(): Promise<Plate[]> {
    return Promise.resolve([...this.plates]);
  }

  // Fetch plates data from database through API
  fetchPlates(): void {
    // Get plates data from API
    this.http.get<Plate[]>(BACKEND_HOST_URL + API_PATH)
      .subscribe((response) => {
        // Assign new data to plates array; and multicast it to platesChanges observers/subscribers
        this.plates = response;
        this.platesChanges.next([...this.plates]);
      });
  }

  // Return Observable for Observers to subscribe for new this.plates data
  getPlatesChanges(): Observable<Plate[]> {
    return this.platesChanges.asObservable();
  }

  // Method for adding new plate record into data source
  addPlateRecord(name: string, surname: string, plateNr: string): void {
    // Create new plate's record
    const plate: Plate = {
      id: null,
      name,
      surname,
      plateNr
    };

    // Persist new plate into database through API
    this.http.post<Plate>(BACKEND_HOST_URL + API_PATH, plate)
      .subscribe((response) => {
        // If new data persisted successfully on database only then:
        {
          // Replace null id with one from document persisted into database
          plate.id = response.id;
          // Push new data into local plates array
          this.plates.push(plate);
          // Multicast new data to platesChanges observers/subscribers
          this.platesChanges.next([...this.plates]);
        }
      });
  }

  ngOnDestroy(): void {
    // To avoid memory leaks set as complete if this component is destroyed
    this.platesChanges.complete();
  }

  // Delete plate from database through API
  deletePlate(id: string): void {
    this.http.delete<Plate>(BACKEND_HOST_URL + API_PATH + '/' + id)
      .subscribe((response) => {
        // If plate deleted from database successfully only then remove it from local plates array
        this.plates = this.plates.filter((el) => el.id !== id);
        // Multicast modified this.plates array to platesChanges observers/subscribers
        this.platesChanges.next([...this.plates]);
      });
  }
}

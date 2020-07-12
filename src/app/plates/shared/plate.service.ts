import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Plate } from './plate.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_HOST_URL = 'http://localhost:3000';
const API_PATH = '/api/plates';

@Injectable({
  providedIn: 'root'
})
export class PlateService implements OnDestroy {
  // Inject HttpClient
  constructor(private http: HttpClient, private router: Router) {
  }

  // Initialize plates array as empty before fetching data from dataSource
  private plates: Plate[] = [];

  // Initialize Observable to multicast changes on this.plates data
  private platesChanges: Subject<Plate[]> = new Subject<Plate[]>();

  getPlates(): Promise<Plate[]> {
    return Promise.resolve([ ...this.plates ]);
  }

  // Fetch plate object from database through API for editing
  fetchPlate(id: string): Observable<Plate> {
    // Return an Observable (sort of promise)
    return this.http.get<Plate>(BACKEND_HOST_URL + API_PATH + '/' + id);
  }

  // Fetch plates data from database through API
  fetchPlates(): void {
    // Get plates data from API
    this.http.get<Plate[]>(BACKEND_HOST_URL + API_PATH)
      .subscribe((response) => {
        // Assign new data to plates array; and multicast it to platesChanges observers/subscribers
        this.plates = response;
        this.platesChanges.next([ ...this.plates ]);
      });
  }

  // Return Observable for Observers to subscribe for new this.plates data
  getPlatesChanges(): Observable<Plate[]> {
    return this.platesChanges.asObservable();
  }

  redirectPageTo(path: string): void {
    this.router.navigate([ path ]);
  }

  // Method for adding new plate record into data source
  addPlate(name: string, surname: string, plateNr: string): void {
    // Create new plate obj
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
          this.platesChanges.next([ ...this.plates ]);
          // Redirect back to home path
          this.redirectPageTo('/');
        }
      });
  }

  // Method for replacing plate document on database
  updatePlate(id: string, name: string, surname: string, plateNr: string): void {
    // Create edited new plate obj
    const editedPlate: Plate = { id, name, surname, plateNr };

    // Persist edited plate into database through API
    this.http.put<Plate>(BACKEND_HOST_URL + API_PATH + '/' + id, editedPlate)
      .subscribe((response) => {
        // If plate updated in database successfully only then:
        {
          // Not really necessary to update local copy as app will fetch whole list on url change
          // // Remove ts copy from local plates array
          // this.plates = this.plates.filter((el) => el.id !== id);
          // // Push new updated data into local plates array
          // this.plates.push(editedPlate);
          // // Multicast new data to platesChanges observers/subscribers
          // this.platesChanges.next([ ...this.plates ]);

          // Redirect back to home path
          this.redirectPageTo('/');
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
        // If plate deleted from database successfully only then
        {
          // Remove it from local plates array
          this.plates = this.plates.filter((el) => el.id !== id);
          // Multicast modified this.plates array to platesChanges observers/subscribers
          this.platesChanges.next([ ...this.plates ]);
        }
      });
  }
}

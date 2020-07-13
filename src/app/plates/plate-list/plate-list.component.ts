import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import { Plate } from '../shared/plate.model';
import { PlateService } from '../shared/plate.service';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.css']
})
export class PlateListComponent implements OnInit, OnDestroy {

  // Initialize as empty array
  private plates: Plate[] = [];
  // Initialize as empty subscription then inside constructor block subscribe to plate data changes
  private platesChangeSubscription: Subscription = Subscription.EMPTY;

  // Initialize columns to render on Material table
  displayedColumns: string[] = ['name', 'surname', 'plateNr', 'buttons'];
  // Define dataSource for Material table
  dataSource: MatTableDataSource<Plate>;

  // Define Paginator and Sort functionality to Material table
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public isLoading: boolean;

  // Inject PlateService into this component as private class member
  constructor(private plateService: PlateService) {
  }

  // Function to update Material table dataSource
  private updateMatTableDataSource(plates: Plate[]): void {
    this.dataSource = new MatTableDataSource<Plate>(plates);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Initialization version
  ngOnInit(): void {
    this.isLoading = true;
    // Fetch plates data from API
    this.plateService.fetchPlates();
    // Subscribe to the platesChange EventEmitter and listen for new data
    this.platesChangeSubscription = this.plateService.getPlatesChanges()
      .subscribe((newPlatesData: Plate[]) => {
        this.isLoading = false;
        // Then platesChange update the plates with new data
        this.plates = newPlatesData;
        this.updateMatTableDataSource(this.plates);
      });
  }

  ngOnDestroy(): void {
    // To avoid memory leaks unsubscribe if this component is destroyed
    this.platesChangeSubscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.plateService.deletePlate(id);
  }
}

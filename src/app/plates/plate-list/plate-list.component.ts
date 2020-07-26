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
  styleUrls: [ './plate-list.component.css' ]
})
export class PlateListComponent implements OnInit, OnDestroy {
  // Define Material progress-bar display/hide boolean
  public isLoading: boolean;

  // Initialize as empty subscription then inside constructor block subscribe to plate data changes
  private platesChangeSubscription: Subscription = Subscription.EMPTY;

  // Initialize columns to render on Material table
  displayedColumns: string[] = [ 'name', 'surname', 'plateNr', 'buttons' ];
  // Define dataSource for Material table
  dataSource: MatTableDataSource<Plate>;

  // Define Paginator and Sort functionality to Material table
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // Inject PlateService into this component as private class member
  constructor(private plateService: PlateService) {
  }

  // Fn to update Material table dataSource and its attributes
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
        // Then platesChange update the dataSource with new data
        this.updateMatTableDataSource(newPlatesData);
      });
  }

  ngOnDestroy(): void {
    // To avoid memory leaks unsubscribe if this component is destroyed
    this.platesChangeSubscription.unsubscribe();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: string): void {
    this.plateService.deletePlate(id);
  }
}

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
  // Subscription to the Plates change EventEmitter
  private platesChangeSubscription: Subscription = Subscription.EMPTY;

  displayedColumns: string[] = ['name', 'surname', 'plateNr'];
  dataSource: MatTableDataSource<Plate>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private plateService: PlateService) {
    this.platesChangeSubscription = plateService.getPlatesChanges()
      .subscribe((changedPlates: Plate[]) => {
        this.plates = changedPlates;
        this.updateDataSource(this.plates);
      });
  }

  private updateDataSource(plates: Plate[]): void {
    this.dataSource = new MatTableDataSource<Plate>(plates);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ngOnInit(): void {
  //   this.plateService.getPlates()
  //     .then(plates => this.updateDataSource(plates));
  // }

  // Initialization version with newer async syntax
  async ngOnInit(): Promise<void> {
    this.plates = await this.plateService.getPlates();
    this.updateDataSource(this.plates);
  }

  ngOnDestroy(): void {
    // To avoid memory leaks unsubscribe if component is destroyed
    this.platesChangeSubscription.unsubscribe();
  }

}

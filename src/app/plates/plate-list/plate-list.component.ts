import { Component, OnInit, ViewChild } from '@angular/core';
import { Plate } from '../shared/plate.model';
import { PlateService } from '../shared/plate.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.css']
})
export class PlateListComponent implements OnInit {

  private plates: Plate[];
  displayedColumns: string[] = ['name', 'surname', 'plateNr'];
  dataSource: MatTableDataSource<Plate>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private plateService: PlateService) {
  }

  // ngOnInit(): void {
  //   this.plateService.getPlates().then(
  //     plates => {
  //       this.dataSource = new MatTableDataSource<Plate>(plates);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     }
  //   );
  // }

  // async initialization version
  async ngOnInit(): Promise<void> {
    this.plates = await this.plateService.getPlates();
    this.dataSource = new MatTableDataSource<Plate>(this.plates);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

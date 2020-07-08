import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { PlateService } from '../shared/plate.service';

@Component({
  selector: 'app-plate-create',
  templateUrl: './plate-create.component.html',
  styleUrls: ['./plate-create.component.css']
})
export class PlateCreateComponent {

  constructor(private plateService: PlateService) { }

  onFormSubmit(formElement: NgForm): void {
    if (formElement.invalid) {
      return;
    }
    this.plateService.addPlateRecord(
      formElement.value.name,
      formElement.value.surname,
      formElement.value.plateNr
    );
    formElement.resetForm();
  }
}

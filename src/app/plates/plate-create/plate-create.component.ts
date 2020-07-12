import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { PlateService } from '../shared/plate.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Plate } from '../shared/plate.model';

@Component({
  selector: 'app-plate-create',
  templateUrl: './plate-create.component.html',
  styleUrls: [ './plate-create.component.css' ]
})
export class PlateCreateComponent implements OnInit {

  // Class members for editing functionality
  private isModeEdit: boolean;
  private plateToEditId: string;
  public plateToEdit: Plate;

  // Inject dependencies
  constructor(
    private plateService: PlateService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    // Listen for changes in URL path parameters to detect Edit Mode
    this.activatedRoute.paramMap
      // Then param change callback function executed
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          // If id param exists set up component into edit mode
          this.isModeEdit = true;
          this.plateToEditId = paramMap.get('id');
          // this.plateToEdit will be used to populate Edit FORM from template with current Plate values
          this.plateService.fetchPlate(this.plateToEditId)
            .subscribe((response) => {
                this.plateToEdit = response;
              }
            );
        } else {
          // else set up component into create mode
          this.isModeEdit = false;
          this.plateToEditId = null;
          this.plateToEdit = null;
        }
      });
  }

  onFormSubmit(formElement: NgForm): void {
    if (formElement.invalid) {
      return;
    }

    // Initialize plate properties
    const name = formElement.value.name;
    const surname = formElement.value.surname;
    const plateNr = formElement.value.plateNr;

    // If component is in edit mode then update existing plate else add new one
    if (this.isModeEdit) {
      this.plateService.updatePlate(this.plateToEditId, name, surname, plateNr);
    } else {
      this.plateService.addPlate(name, surname, plateNr);
    }

    // Reset the form in any case
    formElement.resetForm();
  }
}

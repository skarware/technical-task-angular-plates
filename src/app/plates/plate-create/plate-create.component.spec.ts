import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateCreateComponent } from './plate-create.component';

describe('PlateCreateComponent', () => {
  let component: PlateCreateComponent;
  let fixture: ComponentFixture<PlateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioEditComponent } from './beneficio-edit.component';

describe('BeneficioEditComponent', () => {
  let component: BeneficioEditComponent;
  let fixture: ComponentFixture<BeneficioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

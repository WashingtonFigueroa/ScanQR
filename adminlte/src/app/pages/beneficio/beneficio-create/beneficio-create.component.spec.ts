import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioCreateComponent } from './beneficio-create.component';

describe('BeneficioCreateComponent', () => {
  let component: BeneficioCreateComponent;
  let fixture: ComponentFixture<BeneficioCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficioCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

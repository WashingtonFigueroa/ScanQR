import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioIndexComponent } from './beneficio-index.component';

describe('BeneficioIndexComponent', () => {
  let component: BeneficioIndexComponent;
  let fixture: ComponentFixture<BeneficioIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficioIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

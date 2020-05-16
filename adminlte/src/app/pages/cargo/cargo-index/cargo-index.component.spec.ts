import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoIndexComponent } from './cargo-index.component';

describe('CargoIndexComponent', () => {
  let component: CargoIndexComponent;
  let fixture: ComponentFixture<CargoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

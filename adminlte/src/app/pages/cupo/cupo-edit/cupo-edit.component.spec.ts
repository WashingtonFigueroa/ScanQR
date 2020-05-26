import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupoEditComponent } from './cupo-edit.component';

describe('CupoEditComponent', () => {
  let component: CupoEditComponent;
  let fixture: ComponentFixture<CupoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

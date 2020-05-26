import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupoCreateComponent } from './cupo-create.component';

describe('CupoCreateComponent', () => {
  let component: CupoCreateComponent;
  let fixture: ComponentFixture<CupoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupoIndexComponent } from './cupo-index.component';

describe('CupoIndexComponent', () => {
  let component: CupoIndexComponent;
  let fixture: ComponentFixture<CupoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

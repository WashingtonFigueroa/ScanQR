import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaIndexComponent } from './empresa-index.component';

describe('EmpresaIndexComponent', () => {
  let component: EmpresaIndexComponent;
  let fixture: ComponentFixture<EmpresaIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

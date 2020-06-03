import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteCreateComponent } from './paquete-create.component';

describe('PaqueteCreateComponent', () => {
  let component: PaqueteCreateComponent;
  let fixture: ComponentFixture<PaqueteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaqueteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaqueteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

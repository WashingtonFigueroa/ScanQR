import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteEditComponent } from './paquete-edit.component';

describe('PaqueteEditComponent', () => {
  let component: PaqueteEditComponent;
  let fixture: ComponentFixture<PaqueteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaqueteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaqueteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudIndexComponent } from './solicitud-index.component';

describe('SolicitudIndexComponent', () => {
  let component: SolicitudIndexComponent;
  let fixture: ComponentFixture<SolicitudIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

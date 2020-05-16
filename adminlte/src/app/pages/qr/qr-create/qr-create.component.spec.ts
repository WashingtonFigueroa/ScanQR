import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCreateComponent } from './qr-create.component';

describe('QrCreateComponent', () => {
  let component: QrCreateComponent;
  let fixture: ComponentFixture<QrCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

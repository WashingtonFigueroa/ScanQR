import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrIndexComponent } from './qr-index.component';

describe('QrIndexComponent', () => {
  let component: QrIndexComponent;
  let fixture: ComponentFixture<QrIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidorEditComponent } from './repartidor-edit.component';

describe('RepartidorEditComponent', () => {
  let component: RepartidorEditComponent;
  let fixture: ComponentFixture<RepartidorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepartidorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartidorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

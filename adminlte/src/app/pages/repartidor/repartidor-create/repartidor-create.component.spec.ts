import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidorCreateComponent } from './repartidor-create.component';

describe('RepartidorCreateComponent', () => {
  let component: RepartidorCreateComponent;
  let fixture: ComponentFixture<RepartidorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepartidorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartidorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

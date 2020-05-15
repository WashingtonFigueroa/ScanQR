import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidorIndexComponent } from './repartidor-index.component';

describe('RepartidorIndexComponent', () => {
  let component: RepartidorIndexComponent;
  let fixture: ComponentFixture<RepartidorIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepartidorIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartidorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

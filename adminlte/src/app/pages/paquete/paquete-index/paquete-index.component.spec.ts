import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteIndexComponent } from './paquete-index.component';

describe('PaqueteIndexComponent', () => {
  let component: PaqueteIndexComponent;
  let fixture: ComponentFixture<PaqueteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaqueteIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaqueteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

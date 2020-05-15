import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionIndexComponent } from './presentacion-index.component';

describe('PresentacionIndexComponent', () => {
  let component: PresentacionIndexComponent;
  let fixture: ComponentFixture<PresentacionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

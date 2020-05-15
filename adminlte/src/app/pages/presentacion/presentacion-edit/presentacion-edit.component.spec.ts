import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionEditComponent } from './presentacion-edit.component';

describe('PresentacionEditComponent', () => {
  let component: PresentacionEditComponent;
  let fixture: ComponentFixture<PresentacionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

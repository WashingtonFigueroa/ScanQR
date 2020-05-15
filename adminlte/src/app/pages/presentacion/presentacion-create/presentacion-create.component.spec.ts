import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionCreateComponent } from './presentacion-create.component';

describe('PresentacionCreateComponent', () => {
  let component: PresentacionCreateComponent;
  let fixture: ComponentFixture<PresentacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

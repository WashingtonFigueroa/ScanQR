import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioIndexComponent } from './usuario-index.component';

describe('UsuarioIndexComponent', () => {
  let component: UsuarioIndexComponent;
  let fixture: ComponentFixture<UsuarioIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

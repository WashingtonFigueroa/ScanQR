import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaCreateComponent } from './noticia-create.component';

describe('NoticiaCreateComponent', () => {
  let component: NoticiaCreateComponent;
  let fixture: ComponentFixture<NoticiaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

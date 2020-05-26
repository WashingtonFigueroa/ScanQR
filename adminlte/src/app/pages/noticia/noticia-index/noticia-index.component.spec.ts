import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaIndexComponent } from './noticia-index.component';

describe('NoticiaIndexComponent', () => {
  let component: NoticiaIndexComponent;
  let fixture: ComponentFixture<NoticiaIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiaIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

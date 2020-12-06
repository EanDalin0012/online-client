import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKIconComponent } from './list-k-icon.component';

describe('ListKIconComponent', () => {
  let component: ListKIconComponent;
  let fixture: ComponentFixture<ListKIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

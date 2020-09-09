import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiProEditComponent } from './regi-pro-edit.component';

describe('RegiProEditComponent', () => {
  let component: RegiProEditComponent;
  let fixture: ComponentFixture<RegiProEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiProEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiProEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

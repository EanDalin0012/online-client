import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiVenAddFormComponent } from './regi-ven-add-form.component';

describe('RegiVenAddFormComponent', () => {
  let component: RegiVenAddFormComponent;
  let fixture: ComponentFixture<RegiVenAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiVenAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiVenAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiVenEditComponent } from './regi-ven-edit.component';

describe('RegiVenEditComponent', () => {
  let component: RegiVenEditComponent;
  let fixture: ComponentFixture<RegiVenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiVenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiVenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

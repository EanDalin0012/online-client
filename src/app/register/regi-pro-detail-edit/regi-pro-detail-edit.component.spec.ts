import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiProDetailEditComponent } from './regi-pro-detail-edit.component';

describe('RegiProDetailEditComponent', () => {
  let component: RegiProDetailEditComponent;
  let fixture: ComponentFixture<RegiProDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiProDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiProDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

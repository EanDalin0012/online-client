import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiVenAddComponent } from './regi-ven-add.component';

describe('RegiVenAddComponent', () => {
  let component: RegiVenAddComponent;
  let fixture: ComponentFixture<RegiVenAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiVenAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiVenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

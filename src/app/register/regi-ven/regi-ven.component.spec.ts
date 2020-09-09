import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiVenComponent } from './regi-ven.component';

describe('RegiVenComponent', () => {
  let component: RegiVenComponent;
  let fixture: ComponentFixture<RegiVenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiVenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiVenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

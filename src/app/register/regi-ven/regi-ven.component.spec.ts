import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiVenComponent } from './regi-ven.component';

describe('RegiVenComponent', () => {
  let component: RegiVenComponent;
  let fixture: ComponentFixture<RegiVenComponent>;

  beforeEach(waitForAsync(() => {
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

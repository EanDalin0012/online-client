import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiProDetailViewsComponent } from './regi-pro-detail-views.component';

describe('RegiProDetailViewsComponent', () => {
  let component: RegiProDetailViewsComponent;
  let fixture: ComponentFixture<RegiProDetailViewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiProDetailViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiProDetailViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiProDetailViewsComponent } from './regi-pro-detail-views.component';

describe('RegiProDetailViewsComponent', () => {
  let component: RegiProDetailViewsComponent;
  let fixture: ComponentFixture<RegiProDetailViewsComponent>;

  beforeEach(async(() => {
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

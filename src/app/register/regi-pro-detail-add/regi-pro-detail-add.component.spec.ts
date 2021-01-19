import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiProDetailAddComponent } from './regi-pro-detail-add.component';

describe('RegiProDetailAddComponent', () => {
  let component: RegiProDetailAddComponent;
  let fixture: ComponentFixture<RegiProDetailAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiProDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiProDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

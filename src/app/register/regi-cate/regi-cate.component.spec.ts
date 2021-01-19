import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiCateComponent } from './regi-cate.component';

describe('RegiCateComponent', () => {
  let component: RegiCateComponent;
  let fixture: ComponentFixture<RegiCateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiCateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

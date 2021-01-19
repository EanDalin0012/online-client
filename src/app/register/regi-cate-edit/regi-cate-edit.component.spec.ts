import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiCateEditComponent } from './regi-cate-edit.component';

describe('RegiCateEditComponent', () => {
  let component: RegiCateEditComponent;
  let fixture: ComponentFixture<RegiCateEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiCateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiCateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

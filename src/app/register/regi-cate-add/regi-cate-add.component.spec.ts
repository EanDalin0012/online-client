import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiCateAddComponent } from './regi-cate-add.component';

describe('RegiCateAddComponent', () => {
  let component: RegiCateAddComponent;
  let fixture: ComponentFixture<RegiCateAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiCateAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiCateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

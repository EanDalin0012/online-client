import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiCateComponent } from './regi-cate.component';

describe('RegiCateComponent', () => {
  let component: RegiCateComponent;
  let fixture: ComponentFixture<RegiCateComponent>;

  beforeEach(async(() => {
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

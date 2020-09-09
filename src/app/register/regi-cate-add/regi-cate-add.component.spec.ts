import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiCateAddComponent } from './regi-cate-add.component';

describe('RegiCateAddComponent', () => {
  let component: RegiCateAddComponent;
  let fixture: ComponentFixture<RegiCateAddComponent>;

  beforeEach(async(() => {
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

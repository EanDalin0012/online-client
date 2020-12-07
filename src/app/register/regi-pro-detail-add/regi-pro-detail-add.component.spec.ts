import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiProDetailAddComponent } from './regi-pro-detail-add.component';

describe('RegiProDetailAddComponent', () => {
  let component: RegiProDetailAddComponent;
  let fixture: ComponentFixture<RegiProDetailAddComponent>;

  beforeEach(async(() => {
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiProAddComponent } from './regi-pro-add.component';

describe('RegiProAddComponent', () => {
  let component: RegiProAddComponent;
  let fixture: ComponentFixture<RegiProAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiProAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiProAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

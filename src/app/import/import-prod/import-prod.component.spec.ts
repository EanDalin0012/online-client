import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportProdComponent } from './import-prod.component';

describe('ImportProdComponent', () => {
  let component: ImportProdComponent;
  let fixture: ComponentFixture<ImportProdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

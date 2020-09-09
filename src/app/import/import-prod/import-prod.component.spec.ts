import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProdComponent } from './import-prod.component';

describe('ImportProdComponent', () => {
  let component: ImportProdComponent;
  let fixture: ComponentFixture<ImportProdComponent>;

  beforeEach(async(() => {
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

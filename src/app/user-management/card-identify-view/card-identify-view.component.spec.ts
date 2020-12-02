import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIdentifyViewComponent } from './card-identify-view.component';

describe('CardIdentifyViewComponent', () => {
  let component: CardIdentifyViewComponent;
  let fixture: ComponentFixture<CardIdentifyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardIdentifyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIdentifyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

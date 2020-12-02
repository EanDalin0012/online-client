import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIdentifyComponent } from './card-identify.component';

describe('CardIdentifyComponent', () => {
  let component: CardIdentifyComponent;
  let fixture: ComponentFixture<CardIdentifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardIdentifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIdentifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngClientDetailsComponent } from './user-mng-client-details.component';

describe('UserMngClientDetailsComponent', () => {
  let component: UserMngClientDetailsComponent;
  let fixture: ComponentFixture<UserMngClientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngClientDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngClientDetailsAddComponent } from './user-mng-client-details-add.component';

describe('UserMngClientDetailsAddComponent', () => {
  let component: UserMngClientDetailsAddComponent;
  let fixture: ComponentFixture<UserMngClientDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngClientDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngClientDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

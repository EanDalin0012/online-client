import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngAccComponent } from './user-mng-acc.component';

describe('UserMngAccComponent', () => {
  let component: UserMngAccComponent;
  let fixture: ComponentFixture<UserMngAccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngAccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngAccEditComponent } from './user-mng-acc-edit.component';

describe('UserMngAccEditComponent', () => {
  let component: UserMngAccEditComponent;
  let fixture: ComponentFixture<UserMngAccEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngAccEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngAccEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

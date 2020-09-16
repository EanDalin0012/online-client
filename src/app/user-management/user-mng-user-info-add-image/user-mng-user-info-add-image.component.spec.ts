import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngUserInfoAddImageComponent } from './user-mng-user-info-add-image.component';

describe('UserMngUserInfoAddImageComponent', () => {
  let component: UserMngUserInfoAddImageComponent;
  let fixture: ComponentFixture<UserMngUserInfoAddImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserInfoAddImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserInfoAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

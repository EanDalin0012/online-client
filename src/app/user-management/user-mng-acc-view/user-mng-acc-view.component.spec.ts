import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngAccViewComponent } from './user-mng-acc-view.component';

describe('UserMngAccViewComponent', () => {
  let component: UserMngAccViewComponent;
  let fixture: ComponentFixture<UserMngAccViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngAccViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngAccViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

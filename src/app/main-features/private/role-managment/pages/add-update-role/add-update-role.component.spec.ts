import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRoleComponent } from './add-update-role.component';

describe('AddUpdateRoleComponent', () => {
  let component: AddUpdateRoleComponent;
  let fixture: ComponentFixture<AddUpdateRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateRoleComponent]
    });
    fixture = TestBed.createComponent(AddUpdateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

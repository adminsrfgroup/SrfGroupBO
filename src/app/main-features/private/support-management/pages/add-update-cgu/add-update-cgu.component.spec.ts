import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCguComponent } from './add-update-cgu.component';

describe('AddUpdateCguComponent', () => {
  let component: AddUpdateCguComponent;
  let fixture: ComponentFixture<AddUpdateCguComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateCguComponent]
    });
    fixture = TestBed.createComponent(AddUpdateCguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

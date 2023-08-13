import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFaqComponent } from './add-update-faq.component';

describe('AddUpdateFaqComponent', () => {
  let component: AddUpdateFaqComponent;
  let fixture: ComponentFixture<AddUpdateFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateFaqComponent]
    });
    fixture = TestBed.createComponent(AddUpdateFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

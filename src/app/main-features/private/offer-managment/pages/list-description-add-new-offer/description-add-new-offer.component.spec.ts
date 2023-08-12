import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionAddNewOfferComponent } from './description-add-new-offer.component';

describe('DescriptionAddNewOfferComponent', () => {
  let component: DescriptionAddNewOfferComponent;
  let fixture: ComponentFixture<DescriptionAddNewOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionAddNewOfferComponent]
    });
    fixture = TestBed.createComponent(DescriptionAddNewOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

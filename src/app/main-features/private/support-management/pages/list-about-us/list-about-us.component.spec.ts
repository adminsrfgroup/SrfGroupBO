import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAboutUsComponent } from './list-about-us.component';

describe('ListAboutUsComponent', () => {
  let component: ListAboutUsComponent;
  let fixture: ComponentFixture<ListAboutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAboutUsComponent]
    });
    fixture = TestBed.createComponent(ListAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopSlideComponent } from './add-top-slide.component';
import {SharedModule} from "../../../../../shared/shared.module";
import {provideMockStore} from "@ngrx/store/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AddTopSlideComponent', () => {
  let component: AddTopSlideComponent;
  let fixture: ComponentFixture<AddTopSlideComponent>;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [ AddTopSlideComponent ],
      providers: [provideMockStore({ initialState })],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTopSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

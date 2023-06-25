import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AddressState } from '../state/init.state';

export const addressSelectKey = 'address';

export const selectAddressState = createFeatureSelector<AddressState>(addressSelectKey);

export const selectorAddress = createSelector(selectAddressState, (state: AddressState) => state);

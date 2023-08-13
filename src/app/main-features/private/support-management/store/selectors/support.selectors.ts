import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISupportState } from '../state/support.state';

export const supportSelectKey = 'support';

export const selectSupportState = createFeatureSelector<ISupportState>(supportSelectKey);

export const selectorContactUs = createSelector(selectSupportState, (state: ISupportState) => state.contactUs);

export const selectorAbouttUs = createSelector(selectSupportState, (state: ISupportState) => state.aboutUs);

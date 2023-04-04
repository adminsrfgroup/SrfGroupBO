import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SupportState} from "../state/support.state";

export const supportSelectKey = 'support';

export const selectSupportState = createFeatureSelector<SupportState>(supportSelectKey);

export const selectorContactUs = createSelector(selectSupportState, (state: SupportState) => state.contactUs);

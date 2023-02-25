import {createFeatureSelector, createSelector} from "@ngrx/store";
import {HomeState} from "../state/init.state";

export const homeSelectKey = 'home';

export const selectHomeState = createFeatureSelector<HomeState>(homeSelectKey);

export const selectorTopSlides = createSelector(selectHomeState, (state: HomeState) => state.topSlides);

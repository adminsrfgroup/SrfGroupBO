import { contactUsReducer } from './contact-us.reducer';
import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { ISupportState } from '../state/support.state';
import {aboutUsReducer} from "./about-us.reducer";
import {newsLetterReducer} from "./newsletter.reducer";
import {faqReducer} from "./faq.reducer";

export const supportReducer: ActionReducer<ISupportState, Action> = combineReducers({
    contactUs: contactUsReducer,
    aboutUs: aboutUsReducer,
    newsLetter: newsLetterReducer,
    faq: faqReducer
});

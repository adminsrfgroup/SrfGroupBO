import {contactUsReducer} from "./contact-us.reducer";
import {Action, ActionReducer, combineReducers} from "@ngrx/store";
import {SupportState} from "../state/support.state";

export const supportReducer: ActionReducer<SupportState, Action> = combineReducers({
  contactUs: contactUsReducer
});

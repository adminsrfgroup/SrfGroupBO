import {createAction, props} from "@ngrx/store";
import {PageCommon, Pagination} from "../../../../../shared/models/page.common";
import {IContactUs} from "../../../../../shared/models/contact-us.model";

export const loadListContactUs = createAction(
  '[ListContactUs] Load ListContactUs',
  props<Pagination>());

export const loadListContactUsSuccess = createAction('[ListContactUs] Load ListContactUs Success', props<{ payload: PageCommon<IContactUs> }>());

export const loadListContactUsFailure = createAction('[ListContactUs] Load ListContactUs Failure', props<{ error: any }>());

export const resetListContactUs = createAction('[ListContactUs] Reset ListContactUs');

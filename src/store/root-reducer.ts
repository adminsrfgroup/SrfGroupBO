import { combineReducers } from "redux";
import { addressSlice } from "./address/slice";
import { userSlice } from "./user/slice";
import { categorySlice } from "./category/slice";
import { topSlidesSlice } from "./home/slice";
import { contactUsSlice } from "./contact-us/slice";
import { faqSlice } from "./faq/slice";
import { newsLetterSlice } from "./news-letter/slice";
import { declarationProblemSlice } from "./declaration/slice";
import { aboutUsSlice } from "./about-us/slice";
import { offerSlice } from "./offer/slice";
import { dashboardSlice } from "./dashboard/slice";
import { advertisingSlice } from "./advertising/slice";
import { roleSlice } from "./role/slice";
import { cguSlice } from "./cgu/slice";

interface TypeCommonPayload {
  content: never[];
  totalElements: number;
  totalPages: number;
}

export const CommonPayload = {
  content: [],
  totalElements: 0,
  totalPages: 0
} as TypeCommonPayload;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  category: categorySlice.reducer,
  address: addressSlice.reducer,
  topSlides: topSlidesSlice.reducer,
  contactUs: contactUsSlice.reducer,
  faq: faqSlice.reducer,
  newsLetter: newsLetterSlice.reducer,
  declarationProblem: declarationProblemSlice.reducer,
  aboutUs: aboutUsSlice.reducer,
  offer: offerSlice.reducer,
  dashboard: dashboardSlice.reducer,
  advertising: advertisingSlice.reducer,
  role: roleSlice.reducer,
  cgu: cguSlice.reducer
});

export default rootReducer;

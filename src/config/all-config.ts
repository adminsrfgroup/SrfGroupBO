export const AllAppConfig = {
  VERSION: process.env.VERSION,
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/"
      : "http://192.168.100.104:8080/srf-group/",
  BASE_URL_BE: process.env.REACT_APP_API_END_POINT,
  BASE_URL_FE:
    process.env.NODE_ENV === "development"
      ? process.env.PUBLIC_URL + ""
      : "https://raw.githubusercontent.com/TakiRahal/SrfGroupFE/gh-pages",
  MaxNbeImagePerOffer: 5,
  MaxWidthHome: 1600,
  HOME_TOP_SLIDES_IMAGE: "HomeTopSlidesImage",
  POST_HOME_FEATURE: "PostHomeFeature",
  SlideListBottom: "SlideListBottom",
  DEFAULT_AVATAR: "/assets/images/defaults/avatar.png",
  DEFAULT_LAZY_IMAGE: "/assets/images/defaults/default_image.jpg",
  DEFAULT_LAZY_IMAGE_LOADING:
    "/assets/images/defaults/default_image_loading.gif",
  KeyGoogleMaps: "AIzaSyAe3rSYWX0QyDedMkgg9Mguzj-zd_1sO9k",
  NAME_TOKEN_CURRENT_USER: "tokenCurrentUser",
  NAME_REFRESH_TOKEN_CURRENT_USER: "refreshTokenCurrentUser",
  VALUE_CURRENT_USER: "currentUser",
  APP_ID_FACEBOOK: "667046544674033",
  PAGEFACEBOO__ID: "100054409273167",
  CLIENT_ID_GOOGLLE:
    "936898141282-neqsvsprrf7e1pchibhsui8nmki8496b.apps.googleusercontent.com",
  APP_ID_ONESIGNAL: "52e18c28-761d-409f-a363-f58a9bd41cfe",
  OFFERS_PER_PAGE: 10,
  COMMENTS_PER_PAGE: 2,
  NOTIFICATIONS_PER_PAGE: 10,
  MESSAGES_PER_PAGE: 2,
  GOOGLE_ANALYTICS_MEASUREMENT_ID: "G-T8KR5P5CC4",
  RECAPTCHA_CONTACT_US: {
    SITE_KEY: "6LfkFmsfAAAAAHOTmt8ApKvUBuyka8e4Oa8undvt",
    SECRET_KEY: "6LfkFmsfAAAAAIzBdH6gAR5VjWAo93Kcb0xBVdB_"
  },
  NBE_WORD_SHOW_MORE_LESS: 250
};

// export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
// export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
// export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss.Z[Z]";
// export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
// export const APP_WHOLE_NUMBER_FORMAT = '0,0';
// export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

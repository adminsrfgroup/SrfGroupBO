import { put } from "redux-saga/effects";
import {
  loginUserSuccess,
  loginUserFailure,
  registerUserSuccess,
  registerUserFailure,
  fetchProfileUserSuccess,
  fetchProfileUserFailure,
  updateAvatarSuccess,
  updateAvatarFailure,
  loginWithFacebookSuccess,
  loginWithFacebookFailure,
  loginWithGoogleFailure,
  loginWithGoogleSuccess,
  loginWithGoogleOneTapSuccess,
  loginWithGoogleOneTapFailure,
  sessionUserSuccess,
  sessionUserFailure,
  getNumberOfNotificationsNotSeeSuccess,
  getNumberOfNotificationsNotSeeFailure,
  getNumberOfMessagesNotSeeSuccess,
  getNumberOfMessagesNotSeeFailure,
  fetchUsersSuccess,
  fetchUsersFailure,
  addRemoveAdminSuccess,
  addRemoveAdminFailure,
  blockedUnblockeUserSuccess,
  blockedUnblockeUserFailure
} from "../slice";
import { AllAppConfig } from "../../../config/all-config";
import { invokeWS, MethodHttp } from "../../../lib/api-service";
import { StorageService } from "../../../lib/services/storage.service";

const apiUrl = "api/user/";

export function* loginCustomerHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}public/signin`,
        method: MethodHttp.post
      },
      {
        email: data?.payload?.email,
        password: data?.payload?.password,
        rememberMe: data?.payload?.rememberMe,
        idOneSignal: data?.payload?.oneSignalId
      }
    );

    const bearerToken = result?.headers?.authorization;

    if (bearerToken && bearerToken.slice(0, 7) === "Bearer ") {
      const jwt = bearerToken.slice(7, bearerToken.length);
      if (data?.payload?.rememberMe) {
        StorageService.local.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
      } else {
        StorageService.session.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
      }
    }

    yield put(loginUserSuccess(bearerToken));
  } catch (e) {
    yield put(loginUserFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* loginWithFacebookHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}public/signin-facebook`,
        method: MethodHttp.post
      },
      { ...data?.payload }
    );

    const bearerToken = result?.headers?.authorization;

    if (bearerToken && bearerToken.slice(0, 7) === "Bearer ") {
      const jwt = bearerToken.slice(7, bearerToken.length);
      if (data?.payload?.rememberMe) {
        StorageService.local.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
      } else {
        StorageService.session.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
      }
    }

    yield put(loginWithFacebookSuccess(bearerToken));
  } catch (e) {
    yield put(loginWithFacebookFailure(e));
  }
}

export function* loginWithGoogleHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}public/signin-google-plus`,
        method: MethodHttp.post
      },
      { ...data?.payload }
    );

    const bearerToken = result?.headers?.authorization;

    if (bearerToken && bearerToken.slice(0, 7) === "Bearer ") {
      const jwt = bearerToken.slice(7, bearerToken.length);
      if (data?.payload?.rememberMe) {
        StorageService.local.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
      } else {
        StorageService.session.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
      }
    }

    yield put(loginWithGoogleSuccess(bearerToken));
  } catch (e) {
    yield put(loginWithGoogleFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* loginWithGoogleOneTapHandler(
  data: any
): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}public/signin-google-plus`,
        method: MethodHttp.post
      },
      { ...data?.payload }
    );

    const bearerToken = result?.headers?.authorization;

    if (bearerToken && bearerToken.slice(0, 7) === "Bearer ") {
      const jwt = bearerToken.slice(7, bearerToken.length);
      if (data?.payload?.rememberMe) {
        StorageService.local.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
      } else {
        StorageService.session.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
      }
    }

    yield put(loginWithGoogleOneTapSuccess(bearerToken));
  } catch (e) {
    yield put(loginWithGoogleOneTapFailure(e));
  }
}

export function* sessionUserHandler(): Generator<any, any, any> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}current-user`,
      method: "GET"
    });
    const account = result?.data;
    if (account) {
      StorageService.local.set(
        AllAppConfig.VALUE_CURRENT_USER,
        JSON.stringify(account)
      );
    }

    yield put(sessionUserSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(sessionUserFailure(e));
  }
}

/**
 *
 */
export function* getNumberOfNotificationsNotSeeHandler(): Generator<
  any,
  any,
  any
> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}count-not-see-notifications`,
      method: "GET"
    });
    yield put(getNumberOfNotificationsNotSeeSuccess(result.data));
  } catch (e) {
    console.error(e);
    yield put(getNumberOfNotificationsNotSeeFailure(e));
  }
}

/**
 *
 */
export function* getNumberOfMessagesNotSeeHandler(): Generator<any, any, any> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}count-not-see-messages`,
      method: "GET"
    });
    yield put(getNumberOfMessagesNotSeeSuccess(result.data));
  } catch (e) {
    console.error(e);
    yield put(getNumberOfMessagesNotSeeFailure(e));
  }
}

/**
 *
 * @param Data
 */
export function* registerHandler(data: any): Generator<any, any, any> {
  try {
    console.log("registerHandler ", data.payload);
    const result = yield invokeWS(
      {
        url: `${apiUrl}public/signup`,
        method: MethodHttp.post
      },
      {
        email: data.payload.email,
        password: data.payload.password,
        sourceRegister: data.payload.sourceRegister,
        idOneSignal: data.payload.oneSignalId,
        langKey: data.payload.langKey
      }
    );
    yield put(registerUserSuccess(result));
  } catch (e) {
    console.error(e);
    yield put(registerUserFailure(e));
  }
}

export function* fetchProfileUserHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}admin/profile/${data.payload?.userId}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchProfileUserSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchProfileUserFailure(e));
  }
}

export function* updateAvatarAccountHandler(
  data: any
): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}avatar`,
        method: MethodHttp.post
      },
      data.payload.formData
    );
    const account = result?.data;
    if (account) {
      StorageService.local.set(
        AllAppConfig.VALUE_CURRENT_USER,
        JSON.stringify(account)
      );
    }

    yield put(updateAvatarSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(updateAvatarFailure(e));
  }
}

/**
 *
 */
export function* fetchUsersHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}admin/list-users?page=${data.payload.page}&size=${data.payload.size}${data.payload.queryParams}`,
      method: MethodHttp.get
    });
    yield put(fetchUsersSuccess(result.data));
  } catch (e) {
    console.error(e);
    yield put(fetchUsersFailure(e));
  }
}

/**
 *
 */
export function* blockedUnblockeUserHandler(
  data: any
): Generator<any, any, any> {
  try {
    console.log("blockedUnblockeUserHandler data ", data.payload.blockUnblock);
    const result = yield invokeWS(
      {
        url: `${apiUrl}admin/blocked-user/${data.payload.userId}`,
        method: MethodHttp.post
      },
      data.payload.blockUnblock ? "true" : "false",
      { textPlain: true }
    );
    yield put(blockedUnblockeUserSuccess(result.data));
  } catch (e) {
    console.error(e);
    yield put(blockedUnblockeUserFailure(e));
  }
}

/**
 *
 */
export function* addRemoveAdminHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}super-admin/add-remove-admin/${data.payload.userId}`,
        method: MethodHttp.post
      },
      data.payload.addRemove ? "true" : "false",
      { textPlain: true }
    );
    yield put(addRemoveAdminSuccess(result.data));
  } catch (e) {
    console.error(e);
    yield put(addRemoveAdminFailure(e));
  }
}

export function logoutHandler() {
  if (StorageService.local.get(AllAppConfig.NAME_TOKEN_CURRENT_USER)) {
    StorageService.local.remove(AllAppConfig.NAME_TOKEN_CURRENT_USER);
  }
  if (StorageService.session.get(AllAppConfig.NAME_TOKEN_CURRENT_USER)) {
    StorageService.session.remove(AllAppConfig.NAME_TOKEN_CURRENT_USER);
  }

  StorageService.local.remove(AllAppConfig.VALUE_CURRENT_USER);
  // yield put(logoutSuccess(true));
}

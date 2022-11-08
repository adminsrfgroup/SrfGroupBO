import { all, takeEvery } from "redux-saga/effects";
import {
  loginUser,
  loginWithFacebook,
  loginWithGoogle,
  loginWithGoogleOneTap,
  sessionUser,
  getNumberOfNotificationsNotSee,
  updateAvatarAccount,
  registerUser,
  getNumberOfMessagesNotSee,
  fetchProfileUser,
  fetchUsers,
  blockedUnblockeUser,
  fetchOneSignalsByUser,
  addRemoveAdmin,
  logout
} from "./slice";
import {
  addRemoveAdminHandler,
  blockedUnblockeUserHandler,
  fetchProfileUserHandler,
  fetchUsersHandler,
  getNumberOfMessagesNotSeeHandler,
  getNumberOfNotificationsNotSeeHandler,
  loginCustomerHandler,
  loginWithFacebookHandler,
  loginWithGoogleHandler,
  loginWithGoogleOneTapHandler,
  logoutHandler,
  registerHandler,
  sessionUserHandler,
  updateAvatarAccountHandler
} from "./saga-handler/user.generator";
import { fetchOneSignalsByUserHandler } from "@store/user/saga-handler/one_signal.generator";

export function* userSaga() {
  yield all([
    takeEvery(loginUser, loginCustomerHandler),
    takeEvery(loginWithFacebook, loginWithFacebookHandler),
    takeEvery(loginWithGoogle, loginWithGoogleHandler),
    takeEvery(loginWithGoogleOneTap, loginWithGoogleOneTapHandler),
    takeEvery(sessionUser, sessionUserHandler),
    takeEvery(updateAvatarAccount, updateAvatarAccountHandler),
    takeEvery(
      getNumberOfNotificationsNotSee,
      getNumberOfNotificationsNotSeeHandler
    ),
    takeEvery(getNumberOfMessagesNotSee, getNumberOfMessagesNotSeeHandler),
    takeEvery(registerUser, registerHandler),
    takeEvery(fetchProfileUser, fetchProfileUserHandler),
    takeEvery(fetchUsers, fetchUsersHandler),
    takeEvery(blockedUnblockeUser, blockedUnblockeUserHandler),
    takeEvery(addRemoveAdmin, addRemoveAdminHandler),
    takeEvery(fetchOneSignalsByUser, fetchOneSignalsByUserHandler),
    takeEvery(logout, logoutHandler)
  ]);
}

export default userSaga;

import { AllAppConfig } from "../../config/all-config";
import { StorageService } from "../../lib/services/storage.service";
import { IUser } from "../../lib/models/user.model";

const CURRENT_USER = StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER)
  ? JSON.parse(StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER))
  : null;

export const initialState = {
  login: {
    token: "",
    loading: false
  },
  session: {
    isAuthenticated: CURRENT_USER ? true : false,
    token: "",
    currentUser: CURRENT_USER ? CURRENT_USER : {},
    nbeNotificationsNotRead: 0,
    nbeMessagesNotRead: 0,
    oneSignalId: "",
    loading: false
  },
  register: {
    loading: false,
    addSuccess: false,
    errorMessage: null
  },
  locale: {
    currentLocale: "fr"
  },
  account: {
    loadingPassword: false,
    updateSuccessPassword: false,
    entityUpdateInfos: {},
    loadingUpdateInfos: false,
    updateSuccessInfos: false,
    loadingUpdateAvatar: false,
    updateSuccessAvatar: false,
    entityUpdateAvatar: {}
  },
  profile: {
    loading: false,
    entity: {} as IUser
  },
  user: {
    loading: false,
    entity: {},
    loadingEntities: false,
    entities: [],
    updateSuccess: false,
    loadingReport: false,
    reportSuccess: false,
    errorMessage: null,
    totalItems: -1,
    totalPages: 0,
    loadingBlockedUnblocked: false,
    blockedUnblocked: false,
    loadingAddRemoveAdmin: false,
    addRemoveAdmin: false
  },
  onesignal: {
    loadingEntities: false,
    entities: []
  },
  organigramme: {
    loading: false,
    entity: {}
  }
};

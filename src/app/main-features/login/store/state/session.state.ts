import { StorageService } from '../../../../shared/services/storage.service';
import { AllAppConfig } from '../../../../config';
import { IUser } from '../../../../shared/models/user.model';

const CURRENT_USER = StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER) ? JSON.parse(StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER)) : null;

export interface SessionState {
    isAuthenticated: boolean;
    token: string;
    currentUser: IUser;
    nbeNotificationsNotRead: number;
    nbeMessagesNotRead: number;
    nbeCarts: number;
    oneSignalId: string;
    loading: boolean;
    errorMessage: any;
}

export const initSessionState: SessionState = {
    isAuthenticated: CURRENT_USER ? true : false,
    token: '',
    currentUser: CURRENT_USER ? (CURRENT_USER as IUser) : ({} as IUser),
    nbeNotificationsNotRead: 0,
    nbeMessagesNotRead: 0,
    nbeCarts: 0,
    oneSignalId: '',
    loading: false,
    errorMessage: '',
};

import { EAuthority } from '../constants/authorities';
import {IAuthority} from "../models/authority.model";
import {IPermission} from "../models/permission.model";
import {StorageService} from "../services/storage.service";
import {AllAppConfig} from "../../config";

/**
 *
 * @param file
 * @returns {Promise}
 */
export const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
        } else {
            reject(null);
        }
    });
};

/**
 *
 * @param {string[]} authorities
 * @param {string[]} hasAnyAuthorities
 * @returns {any}
 */
export const hasAnyAuthority = (hasAnyAuthorities: string[]): boolean => {
    if( StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER) ){
        const currentUser = JSON.parse(StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER));
        const authorities = currentUser.authorities;
        return authorities?.some((authority: IAuthority) => {
            if (authority.name == EAuthority.ROLE_MODERATOR || authority.name == EAuthority.ROLE_ADMIN) {
                return true;
            }
            return authority?.permissions?.some((permission: IPermission) => {
                return hasAnyAuthorities?.some((namePermission: string) => {
                    return namePermission?.includes(permission.name || '');
                });
            });
        });
    }
    return false;
};


/**
 * Protected ROLE_MODERATOR, ROLE_ADMIN, ROLE_USER
 * @param authority
 */
export const protectedDefaultAuthorities = (authority: IAuthority): boolean => {
    return authority.name === EAuthority.ROLE_MODERATOR ||
        authority.name === EAuthority.ROLE_ADMIN ||
        authority.name === EAuthority.ROLE_USER
}

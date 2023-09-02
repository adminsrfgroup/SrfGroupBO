import {EAuthority} from "../constants/authorities";

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
export const hasAnyAuthority = (
    authorities: { name: string; permissions: any[] }[],
    hasAnyAuthorities: string[]
): boolean => {
    return authorities?.some((authority: any) => {
        if (
            authority.name == EAuthority.ROLE_MODERATOR ||
            authority.name == EAuthority.ROLE_ADMIN
        ) {
            return true;
        }
        return authority?.permissions?.some((permission: any) => {
            return hasAnyAuthorities?.some((namePermission: string) => {
                return namePermission?.includes(permission.name);
            });
        });
    });
};

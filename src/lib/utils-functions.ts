import { AllAppConfig } from "../config/all-config";

export const isPromise = (value: any): boolean => {
  if (value !== null && typeof value === "object") {
    return value && typeof value.then === "function";
  }
  return false;
};

/**
 *
 * @param file
 * @returns {Promise}
 */
export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
};

/**
 *
 * @returns {string}
 */
export const getBaseImageUrl = (path?: string) => {
  return (
    `${
      process.env.REACT_APP_BASE_URL_FE +
      (process.env?.REACT_APP_PUBLIC_URL || "")
    }` + path
  );
};

/**
 *
 * @param {string} pathApi
 * @returns {string}
 */
// export const getPathApi = (pathApi: string) => {
//     return process.env.REACT_APP_API_END_POINT + pathApi;
// }

/**
 *
 * @param {IOffer} offer
 * @returns {string}
 */
export const getImageForOffer = (offerId?: number, path?: string) => {
  if (!path) {
    return AllAppConfig.DEFAULT_LAZY_IMAGE;
  }
  return `${process.env.REACT_APP_API_END_POINT}api/offer/public/files/${offerId}/${path}`;
};

/**
 *
 * @param {string} username user
 * @param {string} imageUrl user
 * @returns {string}
 */
export const getUserAvatar = (
  userId: number,
  imageUrl?: string,
  souorceProvider?: string
) => {
  // if (!souorceProvider) {
  //     if (!imageUrl) {
  //         return config.DEFAULT_AVATAR;
  //     }
  //     return `${config.BASE_URL}api/user/public/avatar/${userId}/${imageUrl}`;
  // } else if (souorceProvider === SourceProvider.WEB || souorceProvider === SourceProvider.MOBILE) {
  //     if (!imageUrl) {
  //         return config.DEFAULT_AVATAR;
  //     }
  //     return `${config.BASE_URL}api/user/public/avatar/${userId}/${imageUrl}`;
  // }

  // GooglePlus or Facebook
  console.log(userId, souorceProvider);
  return imageUrl;
};

/**
 *
 * @returns {URLSearchParams}
 */
export function useQuery() {
  // const { search } = useLocation();
  // return React.useMemo(() => new URLSearchParams(search), [search]);
}

/**
 *
 * @param {string} dataUrl
 * @param {string} fileName
 * @returns {Promise<File>}
 */
export async function dataUrlToFile(
  dataUrl: string,
  fileName: string
): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/jpeg" });
}

/**
 *
 * @param {string[]} authorities
 * @param {string[]} hasAnyAuthorities
 * @returns {any}
 */
export const hasAnyAuthority = (
  authorities: { name: string }[],
  hasAnyAuthorities: string[]
) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return false;
    }
    return hasAnyAuthorities.some((auth) => {
      return authorities.some((role) => {
        return role.name.includes(auth);
      });
    });
  }
};

// export const convertDateTimeFromServer = (date: Date) => (date ? dayjs(date).format(APP_LOCAL_DATETIME_FORMAT) : null);
//
// export const convertDateTimeToServer = (date: Date) => (date ? dayjs(date).toDate() : null);
//
// export const displayDefaultDateTime = () => dayjs().startOf('day').format(APP_LOCAL_DATETIME_FORMAT);

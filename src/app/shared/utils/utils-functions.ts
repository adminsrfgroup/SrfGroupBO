/**
 *
 * @param file
 * @returns {Promise}
 */
export const getBase64 = (file: any) => {
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

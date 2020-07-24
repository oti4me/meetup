type objectMap = { [key: string]: any };

/**
 * Remove unwanted keys from an object
 *
 * @param {any} object
 * @param {any} keys
 */
export const removeKeys = (object: objectMap, keys: any) => {
  if (Array.isArray(keys)) {
    keys.forEach((key) => delete object[key]);
  } else {
    delete object[keys];
  }
};

type objectMap = { [key: string]: any };

/**
 * Selects and returns a new object from provided keys from an object
 *
 * @param {{ [key: string]: any }} obj
 * @param {Array<string>} props
 * @returns {object}
 */
export const pick = (obj: objectMap, props: Array<string>) => {
  const picked = {};

  props.forEach((prop) => {
    picked[prop] = obj[prop];
  });

  return picked;
};

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

/**
 * Remove keys from an array of objects
 *
 * @param {{ [key: string]: any }} objs
 * @param {*} keys
 */
export const removeKeysMulti = (objs: objectMap, keys: any) => {
  objs.forEach((obj) => removeKeys(obj, keys));
};

/**
 * Sorts arrays by object keys of array items
 *
 * @param {Array<object>} objects
 * @param {string} key
 * @returns {Array<object>}
 */
const sortByKey = (objects: Array<object>, key: string): Array<object> => {
  return objects.sort((a, b) => b[key] - a[key]);
};

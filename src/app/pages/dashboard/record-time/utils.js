/**
 * Maps an array of data objects to an array of option objects.
 * 
 * @param {Object[]} [data=[]] - The input array of data objects.
 * @param {string} [data[].id] - The ID of the data object.
 * @param {string} [data[].name] - The name of the data object.
 * @param {string} [data[].firstName] - The first name of the data object.
 * @param {string} [data[].lastName] - The last name of the data object.
 * @returns {Object[]} - An array of option objects, each with `id`, `myValue`, and `address` properties.
 */
export const mapOptions = (data = []) => data?.map(({ id, name, firstName, lastName }) => ({
  id,
  myValue: id,
  address: name ?? (firstName != null && lastName != null ? `${firstName} ${lastName}` : "John Smith"),
}));

/**
 * Retrieves the value associated with the specified key in the given object.
 *
 * @param {Object} obj - The object to search.
 * @param {string} key - The key to look for in the object.
 * @returns {*} The value associated with the key, or `null` if the key is not present in the object.
 */
export function getValueByKey(obj, key) {
  if (obj?.hasOwnProperty(key)) {
    return obj[key];
  } else {
    return null;
  }
}

/**
 * Extracts a value from a nested object within an array of objects.
 *
 * @param {Object[]} parentArray - The array of objects to search.
 * @param {string} keyToFind - The key (or ID) of the object to find within the parent array.
 * @param {string} [subcategory='tasks'] - The subcategory (or nested property) of the found object to extract the value from.
 * @returns {*|null} The extracted value, or null if the value is not found or the input is invalid.
 */
export const extractValue = (parentArray, keyToFind, subcategory = "tasks") => {
  if (!Array.isArray(parentArray) || parentArray.length === 0) return null;
  
  const valueObject = parentArray.find((item) => item.id === keyToFind);

  return valueObject ? getValueByKey(valueObject, subcategory) : null;
};
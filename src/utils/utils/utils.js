import { showToast } from "../../app/components/atoms/showToast/showToast";
import { LocalStorageKeys, NotificationTypes } from "../../app/constants";
import { useNavigate } from 'react-router-dom';

/**
 * Compose a number of styles together easily
 * @param {String} styles Classes/styles to be applied
 * @return {String} Combined classes
 */
export const composeClasses = (...styles) => {
  let classes = "";

  styles.forEach((arg) => {
    if (arg) classes += `${arg} `;
  });

  return classes.trim();
};

/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @return {Boolean} Boolean value
 */
export const isNotEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0;

/**
 * Encrypts a plaintext string using a given encryption key.
 *
 * @param {string} plaintext - The plaintext string to be encrypted.
 * @param {string} key - The encryption key to use for the encryption.
 * @returns {string} The encrypted data as a base64-encoded string.
 * @throws {Error} If the `plaintext` or `key` is not a string.
 */
export function encryptString(plaintext, key) {
  try {
    // Ensure the plaintext is a string
    if (typeof plaintext !== 'string') {
      throw new Error('Plaintext must be a string');
    }

    // Ensure the key is a string
    if (typeof key !== 'string') {
      throw new Error('Encryption key must be a string');
    }

    const encoder = new TextEncoder();
    const plaintextBytes = encoder.encode(plaintext);
    const encryptedBytes = Array.from(plaintextBytes).map(byte => byte ^ key.charCodeAt(0));
    return btoa(String.fromCharCode(...encryptedBytes));
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
}

/**
 * Decrypts an encrypted data string using a given encryption key.
 *
 * @param {string} encryptedData - The encrypted data as a base64-encoded string.
 * @param {string} key - The encryption key to use for the decryption.
 * @returns {string} The decrypted plaintext string.
 * @throws {Error} If the `encryptedData` or `key` is not a string.
 */
export function decryptString(encryptedData, key) {
  try {
    // Ensure the encrypted data is a string
    if (typeof encryptedData !== 'string') {
      throw new Error('Encrypted data must be a string');
    }

    // Ensure the key is a string
    if (typeof key !== 'string') {
      throw new Error('Encryption key must be a string');
    }

    const dataBytes = atob(encryptedData).split('').map(char => char.charCodeAt(0));
    const decryptedBytes = dataBytes.map(byte => byte ^ key.charCodeAt(0));
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(decryptedBytes));
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
}

/**
 * Pick an array of keys from a given object
 * @param {Object} targetObj Object to remove propeties from
 * @param {Array} props Array of object properties to be deleted
 * @returns {Object} A new object that has the specified properties
 */
export const pick = (targetObj, props) => {
  const picked = {};

  if (!Array.isArray(props)) {
    console.error('[utils.omit] Keys to be omitted should be an array');
    return;
  }

  props.forEach(prop => {
    if (targetObj.hasOwnProperty(prop)) {
      picked[prop] = targetObj[prop];
    }
  });

  return picked;
};


// TODO: setup logout functionality
/**
 * Logs out the user by removing the encrypted user data, access token, and token expiration time from localStorage.
 */
export function logout() {
  try {
    localStorage.removeItem(LocalStorageKeys.USER);
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    localStorage.removeItem(LocalStorageKeys.TOKENDURATION);

    showToast('User logged out successfully', NotificationTypes.INFO);
  } catch (error) {
    showToast('Error logging out', NotificationTypes.ERROR);
    console.error('Error logging out:', error);
  }
}
import { authTokenName } from 'utils/index';

export const getBearerToken = (): string | null => localStorage.getItem(authTokenName);

/**
 * Gets the site-stored authToken from localStorage and returns it in the form of an authorization header
 */
export const getBearerTokenHeader = (): { Authorization: string } => ({ Authorization: `Bearer ${getBearerToken()}` });

/**
 * Sets a returned token in localStorage for attachment to later network requests
 * @param {*} token - A valid JWT authentication token
 */
export const setBearerToken = (token: string): void => {
  localStorage.setItem(authTokenName, token);
};

export const removeBearerToken = (): void => localStorage.removeItem(authTokenName);

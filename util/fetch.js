/**
 * Wraps fetch with the app's URL/domain
 * and the API endpoint
 */
export function apiFetch(resource, init) {
  const domain = process.env.APP_URL;
  const apiEndpoint = process.env.API_ENDPOINT;
  return fetch(domain + apiEndpoint + resource, init);
}

/**
 * Wraps fetch with the app's URL/domain
 * and the AUTH endpoint
 */
export function clientAuthFetch(resource, init) {
  const authEndpoint = process.env.NEXT_PUBLIC_AUTH_ENDPOINT;
  return fetch(authEndpoint + resource, init);
}

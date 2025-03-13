/**
 * Extracts the subdomain from the current hostname.
 */
export const useSubdomain = () => {
  const hostname = window.location.hostname
  const parts = hostname.split('.')

  return parts.length > 2 ? parts[0] : ''
}

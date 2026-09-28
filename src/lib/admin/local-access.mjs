const loopback = new Set(['localhost', '127.0.0.1', '[::1]'])

export function localRequestAllowed(request, env = process.env) {
  if (env.PRIMA_LOCAL_ADMIN !== '1' || env.VERCEL || env.CF_PAGES) return false
  try {
    const internal = new URL(request.url)
    if (!loopback.has(internal.hostname)) return false
    // Next can reconstruct request.url with its listening address. The Host
    // header retains the address actually used by the same-origin browser.
    const host = request.headers.get('host') || internal.host
    if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d{1,5})?$/i.test(host)) return false
    const browserUrl = new URL(`${internal.protocol}//${host}`)
    const origin = request.headers.get('origin')
    if (origin && origin !== browserUrl.origin) return false
    if (request.headers.get('sec-fetch-site') === 'cross-site') return false
    return true
  } catch { return false }
}

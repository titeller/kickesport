import Cookies from 'universal-cookie'

export function savingCookies({ cookieName, data }) {
  const cookie = new Cookies()
  cookie.set(cookieName, data, {
    path: '/',
    maxAge: getCookieMonthMaxAge(),
  })
}

export function getCookieMonthMaxAge() {
  const month = 60 * 60 * 60 * 24 * 30
  return month
}

export function removeCookies({ cookieName }) {
  const cookie = new Cookies()
  cookie.set(cookieName, '', {
    path: '/',
    maxAge: 0,
  })
}

export function getCookies({ cookieName }) {
  const cookie = new Cookies()
  return cookie.get(cookieName)
}


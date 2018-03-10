export const getCookie = (searchOptions) => {
  return new Promise((resolve, reject) => {
    if (!chrome.cookies) {
      return resolve()
    }
    chrome.cookies.get(searchOptions, resolve)
  })
}

export const getAllCookie = (searchOptions) => {
  return new Promise((resolve, reject) => {
    if (!chrome.cookies) {
      return resolve()
    }
    chrome.cookies.getAll(searchOptions, resolve)
  })
}

export const setCookie = (cookieOptions) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.set(cookieOptions, resolve)
  })
}

export const removeCookie = (options) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.remove(options, resolve)
  })
}

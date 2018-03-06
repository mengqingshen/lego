export const getCookie = (searchOptions) => {
  return new Promise((resolve, reject) => {
    if (!chrome.cookies) {
      return resolve()
    }
    chrome.cookies.get(searchOptions, resolve)
  })
}

export const getAllCookie = (searchOptions) => {
  console.log('searchOptions', searchOptions)
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

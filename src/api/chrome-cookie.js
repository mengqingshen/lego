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

export const getAllCookieByDomain = (domain) => {
  const domainParts = domain.split('.')
  const tasks = []
  const domains = []
  for (let i = 0; i < domainParts.length - 1; i++) {
    const domain = domainParts.slice(i).join('.')
    tasks.push(getAllCookie({ domain }))
    domains.push(domain)
  }
  return Promise.all(tasks).then(data => {
    return data.map((cookies, i) => {
      return {
        domain: domains[i],
        cookies
      }
    })
  })
}

export const setCookie = (cookieOptions) => {
  return new Promise((resolve, reject) => {
    chrome.cookie.set(cookieOptions, resolve)
  })
}

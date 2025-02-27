export const setCookie = (name, value, days, hasRepo = false) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const cookieText = `${name}=${value}; expires=${date.toUTCString()}; path=/; secure; SameSite=Strict`;
  
  if (hasRepo) {
    return cookieText
  }
  document.cookie = cookieText;
};

export const waitForCookieSet = async (cookieName, timeout = 1000) => {
  return new Promise((resolve) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (
        document.cookie.includes(cookieName) ||
        Date.now() - start > timeout
      ) {
        clearInterval(interval);
        resolve(document.cookie);
      }
    }, 50);
  });
};

export const waitForCookieDelet = (cookieName, timeout = 1000) => {
  return new Promise((resolve) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (
        !document.cookie.includes(cookieName) ||
        Date.now() - start > timeout
      ) {
        clearInterval(interval);
        resolve(document.cookie);
      }
    }, 50);
  });
};

export const getCookie = (name, repo) => {
  console.log(repo)
  const value = `; ${(repo || document).cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(";")?.shift();
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; SameSite=Strict`;
};

// utils/urlHelpers.ts
export const isAbsoluteUrl = (url: string): boolean => {
  // A simple regex to check if the URL starts with a protocol (http, https, ftp, etc.)
  return /^(?:[a-z]+:)?\/\//i.test(url)
}

export const toUpperSortOrder = (sortParam: string) => {
  return sortParam.replace(/:desc$/i, ':DESC').replace(/:asc$/i, ':ASC')
}

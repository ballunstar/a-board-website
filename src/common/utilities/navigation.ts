// utils/navigation.ts
import { redirect } from 'next/navigation'
import { isAbsoluteUrl } from './url-helper'

interface QueryParams {
  [key: string]: string | number
}

// Function to navigate to a URL with optional query parameters
export const navigateToUrl = (path: string, queryParams: QueryParams = {}, lang?: string): void => {
  let url: string

  // Check if the provided path is an absolute URL
  if (isAbsoluteUrl(path)) {
    url = path
  } else {
    const prefixedPath = `${path}`
    const queryString = new URLSearchParams(queryParams as Record<string, string>).toString()
    url = queryString ? `${prefixedPath}?${queryString}` : prefixedPath
  }

  if (typeof window !== 'undefined') {
    window.location.href = url
  } else {
    redirect(url)
    console.error("Navigation failed: 'window' is undefined.")
  }
}

export const goBack = (): void => {
  if (typeof window !== 'undefined') {
    window.history.back()
  } else {
    console.error("Navigation failed: 'window' is undefined.")
  }
}

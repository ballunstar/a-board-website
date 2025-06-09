import { UserRoleEnum } from '../models/user'

export const ROUTES = {
  POST: (): string => `/post`,

  POST_CREATE: (): string => `/post/create`,

  POST_EDIT: (id: string): string => `/post/edit/${id}`,

  POST_DETAIL: (id: string): string => `/post/${id}`,

  OUR_BLOG: (): string => `/our-blog`,

  LOGIN: (): string => `/login`
}

export const API_ROUTES = {}

export type MenuItemType = {
  label: string
  href: string
  icon: string
  disabled: boolean
  visible: boolean
  badge?: number
  permissions?: UserRoleEnum[]
}

export const MENU_ITEMS: () => { [key: string]: MenuItemType[] } = () => {
  return {
    Home: [
      {
        label: 'Post',
        href: `${ROUTES.POST()}`,
        icon: 'tabler-home',
        disabled: false,
        visible: true,
        permissions: []
      }
    ],
    'Our-Blog': [
      {
        label: 'Our Blog',
        href: `${ROUTES.OUR_BLOG()}`,
        icon: 'tabler-edit',
        disabled: false,
        visible: true,
        permissions: []
      }
    ]
  }
}

export const SECTION_ICONS: { [key: string]: string } = {
  แดชบอร์ด: 'tabler-chart-bar'
}

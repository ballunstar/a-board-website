import get from 'lodash/get'

class QueryOption {
  page: number
  pageSize: number
  sort: string
  _search: string
  locale?: string
  fetchType?: 'NEXT_FETCH' | 'AXIOS' = 'AXIOS'
  filter?: string

  constructor(json: any) {
    this.page = get(json, 'page')
    this.pageSize = get(json, 'pageSize')
    this.sort = get(json, 'sort')
    this._search = get(json, '_search')
    this.locale = get(json, 'locale')
    this.filter = get(json, 'filter')
  }
}

export default QueryOption

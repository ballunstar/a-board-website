import get from 'lodash/get'

class Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number

  constructor(json: any) {
    this.page = get(json, 'page', 1)
    this.pageSize = get(json, 'pageSize', 999)
    this.pageCount = get(json, 'pageCount', 0)
    this.total = get(json, 'total', 0)
  }
}

export default Pagination

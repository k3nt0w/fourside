export interface Pagination {
  totalCount: number
  offsetValue?: number
  perPage: number
  totalPages?: number
  currentPage: number
  nextPage?: number
  prevPage?: number
  isFirstPage?: boolean
  isLastPage?: boolean
}

export const newPagination = (param: { page?: number; perPage?: number; ttlCnt: number }): Pagination => {
  const pagination: Pagination = {
    totalCount: param.ttlCnt,
    currentPage: param.page || 1,
    perPage: param.perPage || 10
  }

  if (param.ttlCnt !== 0) {
    pagination.offsetValue = (pagination.currentPage - 1) * pagination.perPage
    pagination.totalPages = Math.ceil(param.ttlCnt / pagination.perPage)
    if (pagination.currentPage < pagination.totalPages) {
      pagination.nextPage = pagination.currentPage + 1
    }
    if (1 < pagination.currentPage) {
      pagination.prevPage = pagination.currentPage - 1
    }
    if (pagination.totalPages <= pagination.currentPage) {
      pagination.isLastPage = true
    }
    if (pagination.currentPage == 1) {
      pagination.isFirstPage = true
    }
  }

  return pagination
}

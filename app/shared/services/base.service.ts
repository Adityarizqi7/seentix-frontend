export abstract class BaseService {
  protected get api() {
    return useNuxtApp().$api
  }

  protected get<T>(url: string) {
    return this.api<T>(url)
  }

  protected post<T>(
    url: string,
    body?: any
  ) {
    return this.api<T>(url, {
      method: 'POST',
      body
    })
  }

  protected put<T>(
    url: string,
    body?: any
  ) {
    return this.api<T>(url, {
      method: 'PUT',
      body
    })
  }

  protected patch<T>(
    url: string,
    body?: any
  ) {
    return this.api<T>(url, {
      method: 'PATCH',
      body
    })
  }

  protected delete<T>(url: string) {
    return this.api<T>(url, {
      method: 'DELETE'
    })
  }
}
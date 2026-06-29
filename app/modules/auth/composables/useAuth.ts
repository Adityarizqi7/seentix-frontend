import { storeToRefs } from 'pinia'

import { useAuthStore } from '../stores/auth.store'
import AuthService from '../services/auth.service'

import type { SigninRequest, SignupRequest } from '../types/auth-request'

export const useAuth = () => {
  const store = useAuthStore()

  const { user, isAuthenticated } = storeToRefs(store)

  const accessToken = useCookie<string | null>('access_token')

  /**
   * Register
   */
  const signup = async (payload: SignupRequest) => {
    return await AuthService.signup(payload)
  }

  /**
   * signin
   */
  const signin = async (payload: SigninRequest) => {
    const response = await AuthService.signin(payload)
    accessToken.value = response.token;
    store.setAuth(response.user)

    return response
  }

  /**
   * Logout
   */
  const logout = async () => {
    try {
      await AuthService.logout()
    } finally {
      accessToken.value = null

      store.setAuth(null)

      await navigateTo('/signin')
    }
  }

  /**
   * Restore Session
   */
  const profile = async () => {
    if (!accessToken.value) return

    try {
      const user = await AuthService.profile()

      store.setAuth(user)
    } catch {
      accessToken.value = null

      store.setAuth(null)
    }
  }

  return {
    user,
    isAuthenticated,

    signup,
    signin,
    logout,

    profile
  }
}
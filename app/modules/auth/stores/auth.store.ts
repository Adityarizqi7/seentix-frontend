import { defineStore } from 'pinia'
import type { User } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  function setAuth(userData: User | null) {
    user.value = userData
  }

  return {
    user,
    isAuthenticated,

    setAuth
  }
})
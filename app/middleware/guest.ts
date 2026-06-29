import { useAuth } from "~/modules/auth/composables/useAuth"

export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, profile } = useAuth()

  if (!isAuthenticated.value) {
    await profile()
  }

  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})
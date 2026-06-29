import { useAuth } from "~/modules/auth/composables/useAuth"

export default defineNuxtPlugin(async () => {
  const { profile } = useAuth()

  await profile()
})
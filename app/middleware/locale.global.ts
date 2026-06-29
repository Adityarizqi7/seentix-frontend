export default defineNuxtRouteMiddleware((to) => {
  const locale = useState<'id' | 'en'>('locale', () => 'id')

  if (to.path === '/') {
    return navigateTo('/id')
  }

  const routeLocale = Array.isArray(to.params.locale)
    ? to.params.locale[0]
    : to.params.locale

  if (routeLocale === 'id' || routeLocale === 'en') {
    locale.value = routeLocale
  } else {
    return navigateTo('/id')
  }
})
// composables/useLocale.ts
export type Locale = 'id' | 'en'

export const useLocale = () => {
  const locale = useState<Locale>('locale', () => 'id')
  const localeCookie = useCookie<Locale>('locale', {
    default: () => 'id'
  })

  const setLocale = (value: Locale) => {
    locale.value = value
    localeCookie.value = value
  }

  return {
    locale,
    setLocale
  }
}
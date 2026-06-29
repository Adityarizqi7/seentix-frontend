import id from '~/locales/id.json'
import en from '~/locales/en.json'

const messages = {
  id,
  en
}

export const useLocale = () => {
  const locale = useState('locale', () => 'id')

  const t = (key: any) => {
    return key
      .split('.')
      .reduce((obj: any, item: any) => obj?.[item], messages[locale.value]) ?? key
  }

  const setLocale = (value: any) => {
    locale.value = value
  }

  return {
    locale,
    setLocale,
    t
  }
}
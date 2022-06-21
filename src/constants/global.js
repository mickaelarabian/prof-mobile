import { THEME } from '../styles/theme.style'

export const GENDER_OPTIONS = [
  {
    label: 'register.form.male',
    value: 'm'
  },
  {
    label: 'register.form.female',
    value: 'f'
  }
]

export const LANGS = [
  {
    label: 'English',
    uri: require('../assets/langs/en/en.png'),
    value: 'en'
  },
  {
    label: 'French',
    uri: require('../assets/langs/fr/fr.png'),
    value: 'fr'
  },
]

export const LANGSOBJ = {
  en: require('../assets/langs/en/en.png'),
  fr: require('../assets/langs/fr/fr.png')
}

export const CODES = {
  "done": THEME.colors.done,
  "confirmed": THEME.colors.confirmed,
  "cancelled": THEME.colors.cancelled,
  "unconfirmed": THEME.colors.unconfirmed,
}
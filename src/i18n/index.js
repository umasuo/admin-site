import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhHans from './zh-hans'

Vue.use(VueI18n)

const messages = {
  'zh-Hans': zhHans
}

// Create VueI18n instance with options
export default new VueI18n({
  locale: 'zh-Hans',
  messages
})

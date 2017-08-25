export default {
  validateEmail (email) {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return re.test(email)
  },

  validatePassword (password) {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=\S+$).{8,}$/
    return re.test(password)
  }
}

function get (path, obj, fb = `$\{${path}}`) {
  return path.split('.').reduce((res, key) => {
    return res[key]
  }, obj)
}

export function parseTpl (template, map, fallback) {
  return template.replace(/\$\{.+?}/g, (match) => {
    const path = match.substr(2, match.length - 3).trim()
    const value = get(path, map, fallback)
    return value
  })
}

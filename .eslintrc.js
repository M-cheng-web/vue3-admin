module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  plugins: [
    'vue'
  ],
  rules: {
  },
  globals: {
    defineProps: 'readonly'
  }
}

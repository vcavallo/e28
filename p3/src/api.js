export const axios = require('axios').create({
  baseURL: process.env.VUE_APP_API_URL ?? 'http://e28-api.practice.loc:9999/',
  responseType: 'json',
  withCredentials: true,
})


import axios from 'axios'

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : ''
})

export default request

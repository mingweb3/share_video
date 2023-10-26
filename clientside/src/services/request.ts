/* eslint-disable import/no-extraneous-dependencies */
import type { AxiosInstance } from 'axios'
import axios from 'axios'

const apiBeBase = process.env.NEXT_PUBLIC_API_BE

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: apiBeBase,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const clientRequest = new Http().instance

export default clientRequest

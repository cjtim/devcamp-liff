import axios from 'axios'
import useSWR from 'swr'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export function useAPI(url, payload = {}) {
  backendInstance.defaults.headers['authorization'] = `Bearer ${localStorage.getItem('lineToken')}`
  const api = url => backendInstance.post(url, payload).then(res => res.data)
  const { data, error } = useSWR(url, api, {
    errorRetryInterval: 300,
    errorRetryCount: 10
  })
  const newErr = error && !error.status === 403
  return { data: data, error: newErr, isLoading: !data }
}

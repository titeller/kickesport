import axios from 'axios'

export async function get({ url, params, version = '1', authType, authToken, baseURL }) {
  const method = 'get'
  const res = await axiosRequest({ baseURL, url: getUrlRandomString({ url }), method, params, version, authType, authToken })
  return {
    axiosData: res.data,
    data: res.data.data,
  }
}

export async function post({ url, data, version = '1', authType = 'Bearer', authToken, baseURL }) {
  const method = 'post'
  const res = await axiosRequest({ baseURL, url, method, data, version, authType, authToken })
  return {
    axiosData: res.data,
    data: res.data.data,
  }
}

export async function put({ url, data, version, authType, authToken, baseURL }) {
  const method = 'put'
  const res = await axiosRequest({ baseURL, url, method, data, version, authToken, authType })
  return {
    axiosData: res.data,
    data: res.data.data,
  }
}

export async function del({ url, params, version, authType, authToken, baseURL }) {
  const method = 'delete'
  const res = await axiosRequest({ baseURL, url, method, params, version, authType, authToken })
  return {
    axiosData: res.data,
    data: res.data.data,
  }
}

async function axiosRequest({ baseURL, url, method, params, data, version = '1', authType = 'Basic', authToken }) {
  const response = await axios.request({
    baseURL,
    url,
    method,
    headers: Object.assign({ 'Content-Type': 'application/json', 'accept-version': `~${version}` }, { Authorization: `${authType} ${authToken}` }),
    withCredentials: false,
    data: Object.assign({}, data),
    params: Object.assign({}, params),
  })
  return response
}

function getUrlRandomString({ url }) {
  return `${url}?cache=${new Date().getTime()}`
}

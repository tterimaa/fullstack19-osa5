import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = blog => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const like = async blog => {
  blog.likes = blog.likes + 1
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
    return response
  } catch(exception) {
    console.log(exception)
  }
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response
  } catch(exception) {
    console.log(exception)
  }
}

export default { getAll, add, setToken, like, remove }
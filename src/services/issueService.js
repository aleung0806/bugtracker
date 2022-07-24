import axios from 'axios'

const baseUrl = '/api/issues'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (element) => {
  console.log('sending request')
  const response = await axios.post(baseUrl, element)
  console.log('response received', response)
  return response.data
}

const update = async (element) => {
  const response = await axios.push(`${baseUrl}/${element.id}`, element)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default {
  getAll, 
  get,
  create,
  update,
  remove
}
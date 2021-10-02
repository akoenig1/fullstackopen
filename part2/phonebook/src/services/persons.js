import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(res => res.data) 
}

const update = (id, updatedPersonInfo) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPersonInfo)
  return request.then(res => res.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res)
}

const personService = { getAll, create, update, remove }

export default personService

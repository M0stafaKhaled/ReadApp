const axios = require('axios');
const api = "https://reactnd-books-api.udacity.com"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      'Authorization':`Basic ${token}`, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).catch(function (error) {
    console.log(error);
  })
  .then(res => res.json())
  
  .then(data => data.books)
    

  export const searchP = (query) =>
    axios.post(`${api}/search`, { query:query }, { headers })
    .then(response =>response.data.books)

    export const getP = (bookId) =>
     axios.get(`${api}/books/${bookId}`, { headers })
    // .then(res => res.json() )
    .then(response =>response.data.book)
   
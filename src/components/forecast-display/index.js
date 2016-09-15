import fetch from 'node-fetch'
import Moment from 'moment'

const now = Moment().add(1, 'hour').unix()
const location = { lat:45.5238681, lng:-122.66014759999999 }
const APIKey = '8f728d0cd9f64ce4bfd3186bab1bfb1d'
const requestURL = `https://api.forecast.io/forecast/${APIKey}/${location.lat},${location.lng},${now}`
console.log(requestURL)

fetch(requestURL)
  .then(response => response.json())
  .then(json => JSON.parse(json))
  .then(data => {currently: data.currently, summary: data.daily.summary})
  .then(parsedData => JSON.stringify(parsedData, null, '\t'))
  .then(string => console.log(string))
  .catch(error => console.error(error))

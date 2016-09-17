import fetch from 'fetch-jsonp'

export const getWeatherIcon = name => {
  const req = require.context('babel!svg-react!./weather-icons', true)
  return req(`./${name}.svg`)
}

/*
*  You can use a standard fetch outside of a CORS protected environment
*  but I'm passing a fetch implementation in here for isomorphic use
*  This should be updated to hit lambda either way instead
*/
const defaultParams = {location: { lat: 45.5238681, lng: -122.66014759999999 }}
export const fetchForecast = (props=defaultParams)  => {
  const {lat, lng} = props.location
  const APIKey = '8f728d0cd9f64ce4bfd3186bab1bfb1d'
  const requestURL = `https://api.forecast.io/forecast/${ APIKey }/${ lat },${ lng }`
  return fetch(requestURL)
    .then(response => response.json())
    .then(results => {
      return {
        timezone: results.timezone,
        hourly: results.hourly.data[0],
        minutely: results.minutely || {summary: 'No up-to-the-minute data available', data: []}
      }
    })
}

// See
// http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm
// for details about this mapping
export const convertToCardinal = degrees => {
  if (degrees > 360 || degrees < 0) throw new Error('currently does not convert degrees outside 0-360')
  switch (true) {
    case ((degrees <= 11.25) || (degrees >= 348.75)):
      return 'N'
      break
    case ((degrees > 11.25) && (degrees <= 33.75)):
      return 'NNE'
      break
    case ((degrees > 33.75) && (degrees <= 56.25)):
      return 'NE'
      break
    case ((degrees > 56.25) && (degrees <= 78.75)):
      return 'ENE'
      break
    case ((degrees > 78.75) && (degrees <= 101.25)):
      return 'E'
      break
    case ((degrees > 101.25) && (degrees <= 123.75)):
      return 'ESE'
      break
    case ((degrees > 123.75) && (degrees <= 146.26)):
      return 'SE'
      break
    case ((degrees > 146.26) && (degrees <= 168.75)):
      return 'SSE'
      break
    case ((degrees > 168.75) && (degrees <= 191.25)):
      return 'S'
      break
    case ((degrees > 191.25) && (degrees <= 213.75)):
      return 'SSW'
      break
    case ((degrees > 213.75) && (degrees <= 236.25)):
      return 'SW'
      break
    case ((degrees > 236.25) && (degrees <= 258.75)):
      return 'WSW'
      break
    case ((degrees > 258.75) && (degrees <= 281.25)):
      return 'W'
      break
    case ((degrees > 281.25) && (degrees <= 303.75)):
      return 'WNW'
      break
    case ((degrees > 303.75) && (degrees <= 326.25)):
      return 'NW'
      break
    case ((degrees > 326.25) && (degrees < 348.75)):
      return 'NNW'
      break
    default:
      return ''
  }
}

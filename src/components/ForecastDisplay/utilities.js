import AWS from 'aws-sdk'

export const getWeatherIcon = name => {
  const req = require.context('babel!svg-react!./weather-icons', true)
  return req(`./${name}.svg`)
}

// LAMBDA STUFF FOR HIDING FORECAST API KEY
const Lambda = new AWS.Lambda({
  region: 'us-east-1',
  accessKeyId: 'AKIAJMIVROLTFJRCFCQQ',
  secretAccessKey: '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'
})

export const lambdaPromise = params => {
  return new Promise((resolve, reject) => {
    const lambdaCallback = (error, results) => {
      if (error) reject(error)
      resolve(results.Payload)
    }

    Lambda.invoke(params, lambdaCallback)
  })
}

export const invokeLambdaFetch = payload => {
  let json
  try { json = JSON.stringify(payload)}
  catch(error) { throw new Error('The payload you gave me cant be serialized for lambda use...I need something I can JSON.stringify')}
  return lambdaPromise({
    FunctionName: 'weather-map-API',
    Payload: json
  })
}

export const fetchForecast = (location={lat: 45.5238681, lng: -122.66014759999999})  => {
  return invokeLambdaFetch(location)
    .then(response => JSON.parse(response))
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

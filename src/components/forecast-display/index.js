// import fetch from 'node-fetch'
import Moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'fetch-jsonp'

const now = Moment().add(1, 'hour').unix()
const APIKey = '8f728d0cd9f64ce4bfd3186bab1bfb1d'

import CSS from './styles.scss'

export const convertToCardinal = degrees => {
  // See
  // http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm
  // for details about this mapping
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

export const ForecastDisplay = React.createClass({
  getInitialState() {
    const emptyDefault = {
      city: '',
      hourly: {
        summary: '',
        icon: 'clear-day',
        temperature: 0,
        apparentTemperature: 0,
        humidity: 0,
        windSpeed: 0,
        windBearing: 0,
        precipProbability: 0,
        precipIntensity: 0,
        pressure: 0,
        visibility: 0
      },
      minutely: {
        summary: ''
      }
    }

    return emptyDefault
  },

  fetchForecast(props) {
    const defaultLocation = { lat: 45.5238681, lng: -122.66014759999999 }
    const location = props.location ? props.location : defaultLocation
    const requestURL = `https://api.forecast.io/forecast/${ APIKey }/${ location.lat },${ location.lng }`

    fetch(requestURL)
      .then(response => response.json())
      .then(response => {
        return response
      })
      .then(results => ({
        timezone: results.timezone,
        hourly: results.hourly.data[0],
        minutely: results.minutely
      }))
      .then(results => {
        this.setState(Object.assign({}, results, { city: props.city }))
        return results
      })
      .catch(error => console.error(error))
  },

  componentWillReceiveProps(newProps) {
    this.fetchForecast(newProps)
  },

  render() {
    const { hourly, minutely } = this.state
    const req = require.context("babel!svg-react!./weather-icons", true)
    const Icon = req(`./${hourly.icon}.svg`)
    console.log(hourly.icon)
    console.log(CSS[hourly.icon])
    return <section className={ [CSS.column, CSS[hourly.icon], CSS.animated].join(' ') }>
      <div className={ [CSS.heading, CSS.column].join(' ') }>
        <h2>{ this.state.city }</h2>
        <p>{ hourly.summary }</p>
        <Icon />
        <h1 className={ CSS.temp }>{ `${ hourly.temperature }℉` }</h1>
        <p>{ Moment().format('dddd h:mma') }</p>
      </div>


      <div className={ [CSS.line, CSS.column].join(' ') }>
        <p>Current forecast: { minutely ? minutely.summary : 'Unknown' }</p>
      </div>


      <div className={ [CSS.line, CSS.column, CSS.details].join(' ') }>
        <p>Chance of Rain: { `${ hourly.precipProbability }%` }</p>
        <p>Humidity: { `${ Math.round(hourly.humidity * 100) }%` }</p>
        <p>Wind: <span className={ CSS.smallCaps }>{ convertToCardinal(hourly.windBearing).toLowerCase() }</span>{ ` ${hourly.windSpeed} mph` }</p>
        <p>Feels like: { `${hourly.apparentTemperature}℉` }</p>
        <p>Precipitation: { `${ hourly.precipIntensity } in` }</p>
        <p>Pressure: { `${ hourly.pressure } mb` }</p>
        <p>Visibility: { `${ hourly.visibility } mi` }</p>
      </div>
    </section>
  }
})

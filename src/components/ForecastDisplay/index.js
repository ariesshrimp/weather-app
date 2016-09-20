import Moment from 'moment'
import { tz } from 'moment-timezone'
import React from 'react'
import ReactDOM from 'react-dom'
import CSS from './styles.scss'
import { PrecipitationGraph } from './MinuteDataView/index.js'
import { convertToCardinal, fetchForecast, getWeatherIcon } from './utilities.js'

/**
*   Serves as a nice litle API doc for the forecast.io response 🤖🏻
*/
const emptyDefault = {
  city: '',
  timezone: '',
  hourly: {
    summary: '',
    icon: 'default',
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
    summary: '',
    data: []
  }
}

/**
*    A functional  wrapper around the forecast.io fetch from ./utilities
*   It always defaults to Portland, arbitrarily
*   It merges the result with default settings in case any fields
*   are missing on the response
*/
export const updateForecast = ({location={ lat: 45.5238681, lng: -122.66014759999999 }, city='Portland'}) => {
  return fetchForecast(location)
    .then(results => {
      results.minutely = Object.assign({}, emptyDefault.minutely, results.minutely)
      results.hourly = Object.assign({}, emptyDefault.hourly, results.hourly)
      return Object.assign({}, emptyDefault, results, { city })
    })
}

export const Heading = ({ hourly, timezone, city }) => {
  const Icon = getWeatherIcon(hourly.icon)
  return <div className={ [CSS.heading, CSS.column].join(' ') }>
    <h2 className={ CSS.city }>{ city }</h2>
    <p>{ hourly.summary }</p>
    <Icon className="icon"/>
    <h1 className={ CSS.temp }>{ `${ hourly.temperature }℉` }</h1>
    <p>{ timezone ? tz(timezone).format('dddd h:mma') : Moment().format('dddd h:mma') }</p>
  </div>
}

export const DetailsMinutely = ({ minutely }) => {
  return <div className={ [CSS.line, CSS.column].join(' ') }>
    <PrecipitationGraph data={ minutely ? minutely.data : [] }/>
    <p className="summary">Current forecast: { minutely ? minutely.summary : 'Unknown' }</p>
  </div>
}

export const DetailsHourly = ({ hourly }) => {
  return <div className={ [CSS.line, CSS.column, CSS.details].join(' ') }>
    <p>Chance of Rain: { `${ Math.round(hourly.precipProbability * 100) }%` }</p>
    <p>Humidity: { `${ Math.round(hourly.humidity * 100) }%` }</p>
    <p>Wind: <span className={ CSS.smallCaps }>{ convertToCardinal(hourly.windBearing).toLowerCase() }</span>{ ` ${hourly.windSpeed} mph` }</p>
    <p>Feels like: { `${hourly.apparentTemperature}℉` }</p>
    <p>Precipitation: { `${ hourly.precipIntensity } in` }</p>
    <p>Pressure: { `${ hourly.pressure } mb` }</p>
    <p>Visibility: { `${ hourly.visibility } mi` }</p>
  </div>
}

export const ForecastDisplay = React.createClass({
  getInitialState() {
    return Object.assign({}, emptyDefault, {city: this.props.city})
  },

  componentDidMount() {
    updateForecast({
      location: this.props.location,
      city: this.props.city
    }).then(results => this.setState(results))
  },

  componentWillReceiveProps(newProps) {
    updateForecast({
      location: newProps.location,
      city: newProps.city
    }).then(results => this.setState(results))
  },

  render() {
    const { hourly, minutely, timezone } = this.state
    const styles = [CSS.column, CSS[hourly.icon], CSS.animated, CSS.material].join(' ')
    return <section className={ styles }>
      <Heading city={ this.state.city } timezone={ timezone } hourly={ hourly } />
      <DetailsMinutely minutely={ minutely } />
      <DetailsHourly hourly={ hourly } />
    </section>
  }
})

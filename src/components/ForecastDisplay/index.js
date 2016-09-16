import Moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom'
import CSS from './styles.scss'
import { PrecipGraph } from './chart.js'
import { convertToCardinal, fetchForecast, getWeatherIcon } from './utilities.js'


export const ForecastDisplay = React.createClass({
  getInitialState() {
    /**
    *   Serves as a nice litle API doc for the forecast.io response 🤖🏻
    */
    const emptyDefault = {
      city: this.props.city,
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

    return emptyDefault
  },

  /**
  *    A setState wrapper around the forecast.io fetch from ./utilities
  */
  updateForecast({location={ lat: 45.5238681, lng: -122.66014759999999 }, city}) {
    return fetchForecast({location, city})
      .then(results => {
        this.setState(Object.assign({}, results, { city }))
        return results
      })
      .catch(error => console.error(error))
  },

  componentDidMount() {
    this.updateForecast({
      location: this.props.location,
      city: this.props.city
    })
  },

  componentWillReceiveProps(newProps) {
    this.updateForecast({
      location: newProps.location,
      city: newProps.city
    })
  },

  render() {
    const { hourly, minutely } = this.state
    const Icon = getWeatherIcon(hourly.icon)

    return <section className={ [CSS.column, CSS[hourly.icon], CSS.animated, CSS.material].join(' ') }>
      <div className={ [CSS.heading, CSS.column].join(' ') }>
        <h2 className={ CSS.city }>{ this.state.city }</h2>
        <p>{ hourly.summary }</p>
        <Icon />
        <h1 className={ CSS.temp }>{ `${ hourly.temperature }℉` }</h1>
        <p>{ Moment().format('dddd h:mma') }</p>
      </div>


      <div className={ [CSS.line, CSS.column].join(' ') }>
        <PrecipGraph data={ minutely.data }/>
        <p>Current forecast: { minutely ? minutely.summary : 'Unknown' }</p>
      </div>


      <div className={ [CSS.line, CSS.column, CSS.details].join(' ') }>
        <p>Chance of Rain: { `${ hourly.precipProbability * 100 }%` }</p>
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

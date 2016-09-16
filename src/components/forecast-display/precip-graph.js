import React from 'react'
import Moment from 'moment'
import { LineChart } from 'react-d3'

import CSS from './styles.scss'

export const PrecipGraph = props => {
  if (!props.data.length) return null

  const values = props.data.map(data => {
    const minute = Moment.unix(data.time).minute()
    const percent = data.precipProbability * 100
    return { x: minute, y: percent }
  })
  const lineData = [{name: 'rain', values: values, strokeWidth: 1}]

  return <div>
    <LineChart
      className={ CSS.chart }
      data={ lineData }
      circleRadius={ 0 }
      viewBoxObject={{
        x: 0,
        y: 0,
        width: 800,
        height: 400
      }}
      title="Chance of Rain"
      xAxisLabel="time this hour"
      xAxisLabelOffset={ 60 }
      domain={{x: [0,60], y: [0,100]}}
      yAxisStrokeWidth={ '0' }
      strokeWidth={ 10 }
      />
  </div>
}

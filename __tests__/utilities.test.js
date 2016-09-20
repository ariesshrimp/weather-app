import React from 'react'
import { gen, check, property, sample } from 'testcheck'

import { fetchForecast, convertToCardinal } from '../src/components/ForecastDisplay/utilities.js'


describe('Utilities', function()  {
  describe('convertToCardinal', function()  {
    it('should return a string for inputs between 0°-360°', () => {
      const returnsString = integer => typeof convertToCardinal(integer) === 'string'
      const result = check(
        property(
          [gen.intWithin(0, 360)],
          returnsString
        ),
        { times: 360 }
      )

      const actual = result['failing-size']
      expect(actual).not.toBeDefined()
    })

    it('should throw an error for inputs outside 0°-360°', () => {
      const errorMessage = 'currently does not convert degrees outside 0-360'
      const tooLow = () => convertToCardinal(-1)
      const tooHigh = () => convertToCardinal(361)

      expect(tooLow).toThrowError(errorMessage)
      expect(tooHigh).toThrowError(errorMessage)
    })
  })

  describe('fetchForecast', () => {
    it('handles empty arguments with default location: Portland, OR', () => {
      return fetchForecast().then(data => {
        const actual = data.timezone
        const expected = 'America/Los_Angeles'
        expect(actual).toEqual(expected)
      })
    })

    it('allows caller to handle fetch errors however they like', () => {
      return fetchForecast('BADLY_FORMED_REQUEST_PARAM').catch(error => {
        expect(error).toBeDefined()
      })
    })
  })
})

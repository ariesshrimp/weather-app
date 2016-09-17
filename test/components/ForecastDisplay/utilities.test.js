import chai from 'chai'
const { expect, assert } = chai
chai.should()

import { getWeatherIcon, fetchForecast, convertToCardinal } from 'components/ForecastDisplay/utilities.js'
import data from './mock-data.json'


describe('Utilities', function()  {
  describe('getWeatherIcon', function()  {
    it('should return a valid icon component', function()  {
      const actual = getWeatherIcon('default')
      expect(actual).to.be.ok
    })

    it('should error if a non-existant icon is requested', function()  {
      const badRequest = function()  {
        getWeatherIcon('hjbjhsdbfjhsbdfjhbs')
      }
      expect(badRequest).to.throw(Error)
    })
  })

  describe('convertToCardinal', function()  {
    it('should error on numbers outside 0°-360°', function()  {
      const badRequest = function()  {
        convertToCardinal(361)
      }
      expect(badRequest).to.throw(Error)
    })

    it('should be capable of reaching the end', function()  {
      const actual = convertToCardinal(348.74)
      const expected = 'NNW'
      expect(actual).to.equal(expected)
    })

    it('should be correctly bail at the beginning', function()  {
      const actual = convertToCardinal(0)
      const expected = 'N'
      expect(actual).to.equal(expected)
    })
  })

  describe('fetchForecast', function()  {
    it('handles empty arguments with default params', function(done)  {
      fetchForecast().then(data => {
        expect(data).to.be.ok
        done()
      })
    })
  })
})

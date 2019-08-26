/* global test, expect */

import sum from '.'

test('adds numbers together', () => {
  expect(sum(1, 2)).toEqual(3)
})

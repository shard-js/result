/* global test, expect */

import { Ok, Err } from '.'

test('matches on Ok', () => {
  return new Promise((resolve, reject) => {
    const res = Ok('hello')
    res.match(
      resolve,
      reject
    )
  })
})

test('matches on Err', () => {
  return new Promise((resolve, reject) => {
    const res = Err('hello')
    res.match(
      reject,
      resolve
    )
  })
})

test('passes value from Ok', () => {
  const res = Ok('hello')
  res.match(
    val => expect(val).toEqual('hello'),
    () => {}
  )
})

test('passes value from Err', () => {
  const res = Err('hello')
  res.match(
    () => {},
    val => expect(val).toEqual('hello')
  )
})

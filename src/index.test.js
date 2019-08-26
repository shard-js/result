/* global test, expect */

import { Ok, Err } from '.'

test('matches on Ok', () => {
  return new Promise((resolve, reject) => {
    const res = Ok('hello')
    res.match({
      onOk: resolve,
      onErr: reject
    })
  })
})

test('matches on Err', () => {
  return new Promise((resolve, reject) => {
    const res = Err('hello')
    res.match({
      onOk: reject,
      onErr: resolve
    })
  })
})

test('passes value from Ok', () => {
  const res = Ok('hello')
  res.match({
    onOk: (val) => expect(val).toEqual('hello'),
    onErr: () => {}
  }
  )
})

test('passes value from Err', () => {
  const res = Err('hello')
  res.match({
    onOk: () => {},
    onErr: val => expect(val).toEqual('hello')
  })
})

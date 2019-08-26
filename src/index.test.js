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

test('map transforms Ok', () => {
  let res = Ok('hello')
  res = res.map(s => `${s} world!`)
  res.match({
    onOk (val) {
      expect(val).toEqual('hello world!')
    },
    onErr () {
      throw new Error()
    }
  })
})

test('map ignores Err', () => {
  let res = Err('hello')
  res = res.map(s => `${s} world!`)
  res.match({
    onOk () {
      throw new Error()
    },
    onErr (val) {
      expect(val).toEqual('hello')
    }
  })
})

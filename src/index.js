const isResult = Symbol('isResult')

function Result (ok, value) {
  const self = {}

  self[isResult] = true

  self.match = function match ({ onOk, onErr }) {
    if (ok) {
      return onOk(value)
    } else {
      return onErr(value)
    }
  }

  return self
}

function Ok (value) {
  return Result(true, value)
}

function Err (value) {
  return Result(false, value)
}

export {
  Ok,
  Err
}

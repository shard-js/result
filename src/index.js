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

  /**
   * map calls a transform on Result if it is "Ok",
   * otherwise maintaining the previous "Err" value
   */
  self.map = function map (transform) {
    if (typeof transform !== 'function') {
      throw new TypeError('argument to map must be a function')
    }
    if (ok) {
      return Ok(transform(value))
    } else {
      return Err(value)
    }
  }

  self.join = function join () {
    if (value[isResult]) {
      return value.match({
        onOk (inner) {
          return Ok(inner)
        },
        onErr (inner) {
          return Err(inner)
        }
      })
    } else {
      return Result(ok, value)
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

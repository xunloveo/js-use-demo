function findRepeat(data) {
  let obj = {}
  let result = {}
  if (typeof data === 'string') data = data.split('')
  data.reduce((prev, next, index) => {
    if (prev === next) {
      obj[prev] ? obj[prev]++ : (obj[prev] = 2)
    } else {
      if (obj[prev]) {
        if (obj[prev] <= 2) {
          if (index == 2) {
            obj[prev] = 2
          } else {
            if (index == data.length - 1) {
              obj[prev] = 2
            } else {
              obj[prev] = 1
            }
          }
        }
      }
    }
    return next
  }, [])
  if (Object.keys(obj).length == 0) {
    ;[...new Set(data)].forEach(item => {
      obj[item] = 1
    })
  }
  let maxNum = Math.max(...Object.values(obj))
  for (let [key, value] of Object.entries(obj)) {
    if (value === maxNum) {
      result[key] = value
    }
  }
  return result
}

console.log(findRepeat('aajhhhbb'))
// console.log(findRepeat('abbc'))
// console.log(findRepeat('abcacakjbkb'))

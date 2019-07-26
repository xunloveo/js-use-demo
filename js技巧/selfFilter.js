const selfFilter = function(fn, context) {
  let arr = Array.prototype.slice.call(this)
  let filteredArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    console.log(fn.call(context, arr[i], i, this))
    fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])
  }
  return filteredArr
}

// 使用resuce实现
const selfFilterR = function(fn, context) {
  // let arr = Array.prototype.slice.call(this)
  return this.reduce((pre, cur, index) => {
    return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre]
  }, [])
}
Array.prototype.selfFilter = selfFilter
Array.prototype.selfFilterR = selfFilterR

let arr = [1, 2, 3]
console.log(arr.selfFilter(arr => arr > 1))
console.log(arr.selfFilterR(arr => arr > 2))

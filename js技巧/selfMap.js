// 实现自定义map函数
const selfMap = function(fn, context) {
  console.log('this:', this, context)
  let arr = Array.prototype.slice.call(this)
  let mappedArr = []
  // let mappedArr = Array(arr.length - 1)
  for (let i = 0; i < arr.length; i++) {
    // 判断稀疏数组的情况
    if (!arr.hasOwnProperty(i)) continue
    mappedArr[i] = fn.call(context, arr[i], i, this)
  }
  return mappedArr
}

Array.prototype.selfMap = selfMap
let arr = [1, 2, , 3]
console.log(arr.selfMap(arr => arr * 2))
// console.log(
//   arr.selfMap(function(item) {
//     return item * 2
//   })
// )

// 使用reduce 实现
const selfMapR = function(fn, context) {
  let arr = Array.prototype.slice.call(this) // 拷贝原数组
  return arr.reduce((pre, cur, index) => {
    console.log('pre', pre, fn.call(context, cur, index, this))
    return [...pre, fn.call(context, cur, index, this)]
  }, [])
}
Array.prototype.selfMapR = selfMapR
// console.log(arr.selfMapR(arr => arr * 2))

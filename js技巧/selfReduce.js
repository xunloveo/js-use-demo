Array.prototype.selfReduce = function(fn, initialValue) {
  let arr = Array.prototype.slice.call(this)
  let res
  let startIndex
  if (initialValue === undefined) {
    // 找到第一个非空单元(真实的)元素和下标
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      startIndex = i
      res = arr[i]
      break
    }
  } else {
    res = initialValue
  }

  for (let i = ++startIndex || 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    res = fn.call(null, res, arr[i], i, this)
  }

  return res
}

let arr = [1, 2, 3]
console.log(arr.selfReduce((prev, cur) => prev + cur))

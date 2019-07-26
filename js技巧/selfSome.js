const selfSome = function(fn, context) {
  let arr = Array.prototype.slice.call(this)

  if (!this.length) return false
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    if (fn.call(context, arr[i], i, this)) return true
  }
  return false
}

Array.prototype.selfSome = selfSome
let arr = [1, 2, 3]
console.log(arr.selfSome(arr => arr > 1))

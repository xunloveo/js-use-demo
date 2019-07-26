// 联合类型 （strig number)
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
// 只能为string number 类型
// myFavoriteNumber = true
console.log(myFavoriteNumber)

// 我们只能访问联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): string {
  // length 只有string才有
  // return something.length
  // toString 两者都有
  return something.toString()
}

console.log(getLength('aaaa'))
console.log(getLength(7))

// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型

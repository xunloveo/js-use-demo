// 泛型 指在定义函数 接口或类的时候 不先预先指定具体的类型而在使用的时候再指定类型的一种特性

// 1. 简单的例子
function createArray(length: number, value: any): Array<any> {
  let result = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

console.log(createArray(3, 'x'))

// 上面的代码 Array<any>允许数组的每一项都为任意类型但是我们预期的是，数组中每一项都是是输入的value的类型
// 所以 就使用泛型

function createArrayT<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

console.log(createArrayT<string>(3, 'x'))

// 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

console.log([7, 'seven'])

// 泛型约束 由于不知道属于哪种类型 不能随意操作它的属性或方法
// 所以 可以对泛型进行约束
interface Lengthwise {
  length: number
}

function logginIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
// logginIdentity(7)  // 会编译错误 7不包含length属性
logginIdentity('7rr')

// 1. 函数声明 多余的参数是不允许的
function sum(x: number, y: number): number {
  return x + y
}

console.log(sum(1, 2))

// 2. 函数表达式 此箭头和es6的箭头函数不一样
// ts中 => 表示函数的定义，左边是输入类型，需要用括号起来，右边是输出类型
let mySum: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y
}
console.log(mySum(1, 3))

// 3. 用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1
}

console.log(mySearch('abc', 'ddd'))

// 4. 可选参数 也是使用 ?
// 注意： 可选参数必须在必选参数后面
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')
console.log(tomcat)
console.log(tom)

// 5. 参数默认值
function defaultArg(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName
}

let d1 = defaultArg('Tom', 'Cat')
let d2 = defaultArg(undefined, 'a')
console.log(d1)
console.log(d2)

// 6. 剩余参数 rest参数只能是最后一个参数
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item)
  })
  return items
}

let a = []
console.log(push(a, 1, 2, 3))

// 7. 重载 (允许一个函数接收不同数量或类型的参数时，作出不同的处理)
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(
      x
        .toString()
        .split('')
        .reverse()
        .join('')
    )
  } else if (typeof x === 'string') {
    return x
      .split('')
      .reverse()
      .join('')
  }
}

console.log('abc -> reverse ->', reverse('abc'))
console.log('123 -> reverse ->', reverse(123))

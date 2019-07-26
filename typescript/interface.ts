// interface Person {
//   name: string
//   age: number
// }

// let tom: Person = {
//   name: 'Tom',
//   age: 25
// }

// console.log(tom)

// 定义的变量比接口少或者多了一些属性是不允许的 必须和接口 保持一致
// let tom1: Person = {
//   name: 'Tom1'
// }

// 有时 我们希望不要完全匹配一个形状 可以使用可选属性 使用 ? 但是还是不能添加未定义的属性
// interface Person {
//   name: string
//   // 可选属性
//   age?: number
// }

// let p1: Person = {
//   name: 'p1'
// }

// let p2: Person = {
//   name: 'p2',
//   age: 20
// }

// console.log(p1, p2)

// 任意属性  [propName: string]: any
// interface Person {
//   name: string
//   age?: number
//   [propName: string]: any
// }

// let p: Person = {
//   name: 'p',
//   gender: 'male'
// }

// console.log(p)

// 一旦定义了任意属性，那么确定属性和可寻属性的类型都必须是它的类型的子集
// 下面会报错 任意值的允许的是string 但是可选属性age确是number类型 所以报错
// let p1: Person = {
//   name: 'p1',
//   age: 20,
//   gender: 'male'
// }

// 只读属性 使用readonly
interface Person {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}

let p: Person = {
  id: 89757,
  name: 'p',
  gender: 'male'
}

// p.id = 999 // 只读属性不能赋值
// 只读的约束存在于第一次给对象赋值的时候， 而不是第一次给只读属性赋值的时候

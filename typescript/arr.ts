// 1. 使用 类型 + [] 表示
let fibonacci: number[] = [1, 1, 2, 3, 5]

// 数组的项中不允许出现其他的类型

// 2. 数组泛型 Array<eleType> 来表示数组
let fibonacci1: Array<number> = [1, 1, 2, 3, 5]

// 接口表示数组
interface NumberArray {
  [index: number]: number
}

// let fibonacci2: NumberArray = [1, 2, 3, 4, 5]

// 任意数组
let fibonacci2: any[] = [
  {
    id: 1
  },
  {
    id: 2
  }
]
console.log(fibonacci2)

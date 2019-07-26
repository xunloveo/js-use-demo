// 1. 使用 类型 + [] 表示
var fibonacci = [1, 1, 2, 3, 5];
// 数组的项中不允许出现其他的类型
// 2. 数组泛型 Array<eleType> 来表示数组
var fibonacci1 = [1, 1, 2, 3, 5];
// let fibonacci2: NumberArray = [1, 2, 3, 4, 5]
// 任意数组
var fibonacci2 = [
    {
        id: 1
    },
    {
        id: 2
    }
];
console.log(fibonacci2);

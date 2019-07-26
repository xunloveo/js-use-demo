// 类型断言 可以用来手动指定一个值的类型
// <类型>值 或者 值 as 类型
// 类型断言不是类型转换 断言成一个联合类型不存在的类型是不允许的
// 将一个联合类型的变量指定为一个更加具体的类型
function getLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
console.log('abc length:', getLength(123));
console.log('123 length', getLength(123));

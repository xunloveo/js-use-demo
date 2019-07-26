// 泛型 指在定义函数 接口或类的时候 不先预先指定具体的类型而在使用的时候再指定类型的一种特性
// 1. 简单的例子
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
console.log(createArray(3, 'x'));
// 上面的代码 Array<any>允许数组的每一项都为任意类型但是我们预期的是，数组中每一项都是是输入的value的类型
// 所以 就使用泛型
function createArrayT(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
console.log(createArrayT(3, 'x'));
// 多个类型参数
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
console.log([7, 'seven']);
function logginIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// logginIdentity(7)  // 会编译错误 7不包含length属性
logginIdentity('7rr');

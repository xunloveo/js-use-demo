// 1. 函数声明 多余的参数是不允许的
function sum(x, y) {
    return x + y;
}
console.log(sum(1, 2));
// 2. 函数表达式 此箭头和es6的箭头函数不一样
// ts中 => 表示函数的定义，左边是输入类型，需要用括号起来，右边是输出类型
var mySum = function (x, y) {
    return x + y;
};
console.log(mySum(1, 3));
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
console.log(mySearch('abc', 'ddd'));
// 4. 可选参数 也是使用 ?
// 注意： 可选参数必须在必选参数后面
function buildName(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
var tomcat = buildName('Tom', 'Cat');
var tom = buildName('Tom');
console.log(tomcat);
console.log(tom);
// 5. 参数默认值
function defaultArg(firstName, lastName) {
    if (firstName === void 0) { firstName = 'Tom'; }
    return firstName + ' ' + lastName;
}
var d1 = defaultArg('Tom', 'Cat');
var d2 = defaultArg(undefined, 'a');
console.log(d1);
console.log(d2);
// 6. 剩余参数 rest参数只能是最后一个参数
function push(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
    return items;
}
var a = [];
console.log(push(a, 1, 2, 3));
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x
            .toString()
            .split('')
            .reverse()
            .join(''));
    }
    else if (typeof x === 'string') {
        return x
            .split('')
            .reverse()
            .join('');
    }
}
console.log('abc -> reverse ->', reverse('abc'));
console.log('123 -> reverse ->', reverse(123));

/**
 * 实现new的思路：
 * 	1. 首先创建一个空的对象，空对象的_proto_属性指向构造函数的原型对象
 * 	2. 把上面的空对象赋值构造函数内部的this,用构造函数内部的方法修改空对象
 * 	3. 如果构造函数返回一个非基本类型的值，则返回这个值， 否则返回上面创建的对象
*/
function _new (fn, ...arg) {
	const obj = Object.create(fn.prototype)
	const ret = fn.apply(obj, arg)
	return ret instanceof Object ? ret : obj
}

// test
let Dog = function(name) {
	this.name = name
}
Dog.prototype.bark = function() {
	console.log('bark')
}
Dog.prototype.sayName = function () {
	console.log(`My name is ${this.name}`)
}

let dog = _new(Dog, 'simao')
dog.bark()
dog.sayName()
console.log(dog instanceof Dog)

/**
 * 函数柯里化实现
 * 
 */

function currying(fn, length) {
	length = length || fn.length // 第一次调用函数fn参数的长度， 后续调用获取fn剩余参数的长度
	return function (...args) {
		console.log(args.length, length)
		return args.length >= length 
			? fn.apply(this, args)
			: currying(fn.bind(this, ...args), length - args.length)
	}
}

// es6 简化版
const simpleCurrying = fn =>
	judge = (...args) => 
		args.length >= fn.length
			? fn(...args)
			: (...arg) => judge(...args, ...arg)

// test 
const fn = currying(function(a, b, c) {
	console.log([a, b, c])
})

// fn("a", "b", "c")
// fn("a", "b")("c")
// fn("a")("b")("c")

const f1 = simpleCurrying((a, b, c) =>
	console.log([a, b, c])
)
f1("a", "b", "c")
f1("a")("b", "c")
f1("a", "c")("b")
f1("a")("b")("c")
/**
 * 购买例子： 
 * 	3种模式购买的节点函数 如果摸个节点不能处理请求， 则返回一个特定的字符串
 * 		'nextSuccesor'来表示该请求需要继续往后面传递
 * 		
 */


/**
 * [order500 description] 500元定金预付 如果不满足继续往后请求
 * @param  {[type]} orderType [description]
 * @param  {[type]} pay       [description]
 * @param  {[type]} stock     [description]
 * @return {[type]}           [description]
 */
let order500 = function (orderType, pay, stock) {
	if (orderType === 1 && pay === true) {
		console.log('500元定金预购，得到100元优惠券')
	} else {
		return 'nextSuccesor'  // 把请求往后面传递
	}
}

let order200 = function (orderType, pay, stock) {
	if (orderType === 2 && pay === true) {
		console.log('200元定金预购，得到50元优惠券')
	} else {
		return 'nextSuccesor'  // 把请求往后面传递
	}
}

let orderNormal = function (orderType, pay, stock) {
	if (stock > 0) {
		console.log('普通购买， 没有优惠券')
	} else {
		console.log('库存不足')
	}
}

/**
 * 定义一个构造函数 Chain 在new Chain的时候传递的参数即为需要被包装的函数
 * 	同时它还有个this.successor 属性，表示链中的下一个节点
 * 	此外， 还有两个函数 
 */

let Chain = function (fn) {
	this.fn = fn
	this.successor = null
}


// 下一个节点
Chain.prototype.setNextSuccessor = function (successor) {
	return this.successor = successor
}


// 传递请求给某个节点
Chain.prototype.passRequest = function () {
	let ret = this.fn.apply(this, arguments)
	if (ret === 'nextSuccesor') {
		return this.successor && this.successor.passRequest.apply(this.successor, arguments)
	}
	return ret
}

// 把3个订单函数分别包装成职责链的节点
let chainOrder500 = new Chain(order500)
let chainOrder200 = new Chain(order200)
let chainOrderNormal = new Chain(orderNormal)

// 指定节点在职责连中的顺序
chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

// 最后把请求给第一个节点
chainOrder500.passRequest(1, true, 500)
chainOrder500.passRequest(2, true, 500)
chainOrder500.passRequest(3, true, 20)
chainOrder500.passRequest(1, false, 0)
 

console.log('*******************************************************')
console.log('********异步的职责链**************')

/**
 * 新加入一个next方法 表示手动传递请求给职责链的下一个节点
 */

Chain.prototype.next = function () {
	return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}

let fn1 = new Chain(function () {
	console.log(1)
	return 'nextSuccesor'
})

let fn2 = new Chain(function () {
	console.log(2)
	let self = this
	setTimeout(function () {
		self.next()
	}, 1000)
})

let fn3 = new Chain(function () {
	console.log(3)
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest()
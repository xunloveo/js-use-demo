/**
 * 实现发布-订阅
 * 	1. 首先要指定好谁当发布者(售楼处)
 * 	2. 然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者
 * 	3. 最后发布消息的时候， 发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数
 * 	
 */

let salesOffices = {} // 定义售楼处

salesOffices.clientlist = {} // 缓存列表，存放订阅者的回到函数

salesOffices.listen = function (key, fn) { // 添加订阅者
	if (!this.clientlist[key]) {  // 如果还没有订阅过 创建一个缓存列表
		this.clientlist[key] = []
	}
	this.clientlist[key].push(fn)  // 订阅的消息添加到缓存列表
}

salesOffices.trigger = function() { // 发布消息
	let key = Array.prototype.shift.call(arguments) // 取出消息类型
	console.log('key,', key)
	let fns = this.clientlist[key] // 去除改消息对应的回调函数集合

	if (!fns || fns.length === 0) {
		// 如果没有订阅 返回
		return false
	}
	for (let i = 0, fn; fn = fns[i++];) {
		fn.apply(this, arguments)  // argument 是发布附带的参数
	}
}

salesOffices.listen('squreMeter88',(price) => {  // 小明订阅信息
	console.log('价格：' + price)
})

salesOffices.listen('squreMeter110', (price) => {  // 小红订阅信息
	console.log('价格：' + price)
})

salesOffices.trigger('squreMeter88', 2000000)
salesOffices.trigger('squreMeter110', 3000000)
let arr = Array.from({length: 100000}).map((_, i) => i + 1)

/**
 * [fun description] 常规做法 取数组长度内的随机数 每当生成一个就删除数组
 * @param  {[type]} arr [description]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function fun(arr, num) {
	let arr_ = [...arr]
	let result = []
	for (let i = 0; i < num; i++) {
		let random = Math.floor(Math.random() * arr_.length)
		result.push(arr_[num])
		arr_.splice(random, 1)
	}
	return result
}

/**
 * [shuffle description]
 * 洗牌算法：
 * 	1. 生成一个0 - arr.length 的随机数
 * 	2. 交换随机数位置和数组的最后一个元素， 并把该随机数位置的元素放入结果数组
 * 	3. 生成一个0 - arr.lengtj - 1的随机数
 * 	4. 交换随机数位置和数组的倒数第二个元素， 并把该随机数位置的元素放入到结果数组
 * 	5. 一次类推
 * @param  {[type]} arr [description]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function shuffle(arr, num) {
	let result = []
	for (let i = 0; i < num; i++) {
		let random = Math.floor(Math.random() * (arr.length - i))
		let item = arr[random]
		result.push(item)
		arr[random] = arr[arr.length -1 -i]
		arr[arr.length -1 -i] = item  // 把选中的换到后面
	}
	return result
}

// console.time('test')
// fun(arr, 10000)
// console.timeEnd('test')  // 117.322ms 109.240ms 大部分在110ms左右

console.time('test1')
shuffle(arr, 10000)
console.timeEnd('test1')  // 消耗时间在 3ms左右
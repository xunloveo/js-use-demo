
// 内部迭代器
let each = (ary, cb) => {
	for (let i = 0, l = ary.length; i < l; i++) {
		cb.call(ary[i], i, ary[i]) // 把下标和元素当做参数传给cb函数
	}
}

// 调用
each([1, 2, 3], (i, n) => {
	console.log([i, n])
})


// 外部迭代器 必须显示迭代下一个元素
let Iterator = (obj) => {
	let current = 0

	let next = () => {
		current += 1
	}

	let isDone = () => {
		return current >= obj.length
	}

	let getCurrentItem = () => {
		return obj[current]
	}

	return {
		next,
		isDone,
		getCurrentItem,
		length: obj.length
	}
}

// 比较两个数组是否相等
let compare = (iterator1, iterator2) => {
	if (iterator1.length !== iterator2.length) {
		console.log('not equale')
		return 
	}
	while(!iterator1.isDone() && !iterator2.isDone()) {
		if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
			console.log('not equale')
			return 
		}
		iterator1.next()
		iterator2.next()
	}
	console.log('equale')
}

let it1 = Iterator([1, 2, 3])
let it2 = Iterator([1, 2, 3])

compare(it1, it2)

let it3 = Iterator([2, 1, 3])
let it4= Iterator([3, 2, 1])
compare(it3, it4)
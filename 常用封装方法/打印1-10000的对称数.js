/**
 * 打印出1-10000的对称数
 * 如 121 1221 1331 ......
 */

function symmertric(arr) {
	let tmp = arr.filter(x => x.toString().length > 1 && 
			x === Number(x.toString().split('').reverse().join(''))
		
	)
	return tmp

}

// console.log([...Array(10000).keys()].map(x => x + 1))
console.log(symmertric([...Array(10000).keys()].map(x => x + 1)))
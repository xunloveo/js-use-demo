/**
 * 旋转数组
 * 格式如下：
 * 	输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
		输出: [5, 6, 7, 1, 2, 3, 4]
		解释:
		向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
		向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
		向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]

		输入: [-1, -100, 3, 99] 和 k = 2
		输出: [3, 99, -1, -100]
		解释: 
		向右旋转 1 步: [99, -1, -100, 3]
		向右旋转 2 步: [3, 99, -1, -100]
 */

	function rotateArray(arr, step) {	
		if (!step) return arr	
		step = step % 7
		let tmp = []
		let len = arr.length
		for (let i = 0; i < step; i++) {
			tmp[i] = arr[len - step + i]
		}
		for (let j = len - 1; j >= step; j--) {
			arr[j] = arr[j - step]
		}
		for (let k = 0; k < step; k++) {
			arr[k] = tmp[k]
		}		
		return arr
	}

	// 使用简便方法
	function rotateArr(arr, step) {
		let len = arr.length
		step = step % len
		return step === 0 ?  arr 
			: arr.slice(-step).concat(arr.slice(0, len - step))
	}

	let arr = [1, 2, 3, 4, 5, 6, 7]
	console.log(rotateArray(arr, 7))
	console.log(rotateArr(arr, 3))
	let arr1 = [-1, -100, 3, 99]
	//console.log(rotateArray(arr1, 2))
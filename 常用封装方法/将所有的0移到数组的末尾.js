
/**
 * 给定一个数组nums,编写一个函数将所有0移动到数组的末尾，同时保持非零元素的相对顺序
 * 示例： [0, 1, 0, 3, 12] 输出 [1, 3, 12, 0, 0]
 * 要求： 
 * 		1. 必须在原数组上操作，不能拷贝额外的数组
 * 		2. 尽量减少操作次数
 */
function moveZero(arr) {
	let len = arr.length
	let j = 0;
	for (let i = 0; i < len - j; i++) {
		console.log(i)
		if (arr[i] === 0) {
			arr.push(0)
			arr.splice(i, 1)
			i--
			j++
		}		
	}
	return arr
}

// test 
let arr = [0, 1, 0, 3, 12]
console.log(moveZero(arr))
let map = document.querySelector('.map')
let arr = []
// 生成10个随机颜色盒子
for (let i = 0; i < 10; i++) {
	let r = Tool.getRandom(0, 255)
	let g = Tool.getRandom(0, 255)
	let b = Tool.getRandom(0, 255)

	let divBox = new Box({
		backgroundColor: `rgb(${r}, ${g}, ${b})`
	})
	divBox.render(map)
	arr.push(divBox)
}

// 定时随机生成盒子的位置
setInterval(random, 500)

function random () {
	arr.forEach(item => item.random())
}
random()
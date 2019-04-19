// 构造函数 Box
// 属性
// 		backgroundColor
// 		width
// 		height
// 		x
// 		y
// 		
// 	方法
// 			render 渲染
// 			random 随机生成盒子的位置
// 			

let _position = 'absolute'
let _map = null
// let _div = null  // 在这里设置 最会渲染最后一个

// Box 构造函数
function Box ({ backgroundColor = 'red', width = 20, height = 20, x = 0, y = 0 } = {}) {
	this.backgroundColor = backgroundColor
	this.width = width 
	this.height = height
	this.x = x
	this.y = y
	this.div = null
}

// 渲染函数 把盒子渲染到地图上
Box.prototype.render = function (map) {
	_map = map
	// 动态创建div
	var div = document.createElement('div')
	this.div = div
	map.appendChild(div)

	// 设置样式
	div.style.backgroundColor = this.backgroundColor
	div.style.width = this.width + 'px'
	div.style.height = this.height + 'px'
	div.style.left = this.x + 'px'
	div.style.top = this.y + 'px'
	div.style.position = _position	
}

// 随机生成盒子的位置
Box.prototype.random = function () {
	if (!_map) return
	this.x = Tool.getRandom(0, (_map.offsetWidth / this.width - 1) * this.width)
	this.y = Tool.getRandom(0, (_map.offsetHeight / this.height - 1) * this.height)
	this.div.style.left = this.x + 'px'
	this.div.style.top = this.y + 'px'
}

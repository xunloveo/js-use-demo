// 封装食物的构造函数Food
// 		属性
// 					color
// 					width
// 					height
// 					x
// 					y	
// 		方法
// 					render 渲染
// 					random 随机位置
// 					
(function (window) {
	let _position = 'absolute'	
	let _map = null		
	let _div = null
	function Food ({ color = 'green', width = 20, height = 20, x = 0, y = 0 } = {}) {
		this.color = color
		this.width = width
		this.height = height
		this.x = x
		this.y = y
	}

	// 渲染方法
	Food.prototype.render = function (map) {
		_map = map
		// 创建div
		let div = document.createElement('div')
		_div = div
		map.appendChild(div)
		div.style.backgroundColor = this.color
		div.style.width = this.width + 'px'
		div.style.height = this.height + 'px'
		div.style.left = this.x + 'px'
		div.style.top = this.y + 'px'
		div.style.position = _position
	}

	// 随机位置方法
	Food.prototype.random = function () {
		if (!_map) return 
		this.x = Tool.getRandom(0, (_map.offsetWidth / this.width - 1) * this.width)
		this.y = Tool.getRandom(0, (_map.offsetHeight / this.height - 1) * this.height)
		_div.style.left = this.x + 'px'
		_div.style.top = this.y + 'px'
	}

	window.Food = Food
})(window)

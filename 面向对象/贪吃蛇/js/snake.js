// 蛇构造函数 Snake
// 		属性
// 					width 每格宽度
// 					height 每格高度
// 					body [] 第一格是蛇头 
// 					direction 运动方向
// 		方法
// 					render 渲染
// 					move 移动

(function (window) {
	let _position = 'absolute'

	function Snake ({ width = 20, height = 20, direction = 'right' } = {}) {
		this.width = width
		this.height = height
		this.body = [{
			x: 3,
			y: 2,
			color: 'red'
		}, {
			x: 2,
			y: 2,
			color: 'blue'
		}, {
			x: 1,
			y: 2,
			color: 'blue'
		}]
	}			

	// 渲染
	Snake.prototype.render = function (map) {
		// 删除之前创建的蛇对象
		let ele = document.getElementsByClassName('snake')
		while (ele.length > 0) {
			map.removeChild(ele[0])
		}
		
		// 把蛇显示到界面
		this.body.forEach(item => {
			let div = document.createElement('div')
			map.appendChild(div)
			div.className = 'snake'
			div.style.width = this.width + 'px'
			div.style.height = this.height + 'px'
			div.style.backgroundColor = item.color
			div.style.position = _position
			div.style.left = item.x * this.width + 'px'
			div.style.top = item.y * this.height + 'px'
		})
	}

	// 移动
	Snake.prototype.move = function (direction) {		
		// 1. 蛇身 后一节到前一节位置
		for (let i = this.body.length - 1; i >= 1 ; i--) {
			this.body[i].x = this.body[i-1].x
			this.body[i].y = this.body[i-1].y
		}
		// 2. 蛇头的位置根据方向		
		switch (direction) {
			case 'top':
				this.body[0].y -= 1
			case 'right':
				this.body[0].x += 1
			case 'bottom':
				this.body[0].y += 1
			case 'left':
				this.body[0].x -= 1
			default:
				this.body[0].x += 1
		}

	}

	window.Snake = Snake

	// 测试
	// let snake = new Snake()
	// snake.render(map)

	// snake.move()
	// snake.render(map)

	// snake.move()
	// snake.render(map)

	// snake.move()
	// snake.render(map)

	// snake.move()
	// snake.render(map)
})(window)

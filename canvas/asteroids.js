$(function() {
	let cav = $("#cav")
	let ctx = cav.get(0).getContext('2d')

	let cavWidth = cav.width()
	let cavHeight = cav.height()

	$(window).resize(resizeCanvas)

	function resizeCanvas() {
		cav.attr("width", document.documentElement.offsetWidth)
		cav.attr('height', document.documentElement.offsetHeight)
		cavWidth = cav.width()
		cavHeight = cav.height()
	}

	resizeCanvas()

	let playAnimation = true

	let startBtn = $("#startAnimation")
	let stopBtn = $("#stopAnimation")

	startBtn.hide()
	startBtn.click(function() {
		$(this).hide()
		stopBtn.show()
		playAnimation = true
		animate()
	})

	stopBtn.click(function() {
		$(this).hide()
		startBtn.show()
		playAnimation = false
	})

	// 小球 对象
	let Asteroid = function(x, y, radius, vx, vy, ax, ay) {
		this.x = x
		this.y = y
		this.radius = radius
		this.vx = vx
		this.vy = vy
		this.ax = ax
		this.ay = ay
	}

	let asteroids = []

	 // 生成10个随机大小 随机位置, 速度的 小球
	for (let i = 0; i < 10; i++) {
		let x = 20 + (Math.random() * (cavWidth - 40))
		let y = 20 + (Math.random() * (cavHeight - 40))
		let radius = 5 + Math.random() * 10
		let vx = Math.random() * 4 - 2
		let vy = Math.random() * 4 - 2
		let ax = Math.random() * 0.2 - 0.1
		let ay = Math.random() * 0.2 - 0.1
		asteroids.push(new Asteroid(x, y, radius, vx, vy, ax, ay))
	}

	function animate() {
		ctx.clearRect(0, 0, cavWidth, cavHeight)
		ctx.fillStyle = 'rgb(255, 255, 255)'

		let asteroidsLength = asteroids.length
		for (let i = 0; i < asteroidsLength; i++) {
			let tmpAsteroid = asteroids[i]

			// 判断是否重叠
			for (let j = i + 1; j < asteroidsLength; j++) {
				let tmpAsteroidB = asteroids[j]
				let dx = tmpAsteroidB.x - tmpAsteroid.x
				let dy = tmpAsteroidB.y - tmpAsteroid.y
				let distance = Math.sqrt((dx * dx) + (dy * dy))
				if (distance < tmpAsteroid.radius + tmpAsteroidB.radius) {
					// 重叠了
					let angle = Math.atan2(dy, dx) // 计算两个圆之间的角度
					let sine = Math.sin(angle)
					let cosine = Math.cos(angle)

					// 先旋转把两个圆之间的角度弄掉 算出此时圆的位置和速度
					let x = 0
					let y = 0

					let xb = dx * cosine + dy * sine
					let yb = dy * cosine - dx * sine

					let vx = tmpAsteroid.vx * cosine + tmpAsteroid.vy * sine
					let vy = tmpAsteroid.vy * cosine - tmpAsteroid.vx * sine

					let vxb = tmpAsteroidB.vx * cosine + tmpAsteroidB.vy * sine
					let vyb = tmpAsteroidB.vy * cosine - tmpAsteroidB.vx * sine

					// 把小行星的速度改为反向运动
					vx *= -1
					vxb *= -1

					xb = x + tmpAsteroid.radius + tmpAsteroidB.radius

					// 最后 需要把这些小行星旋转到它们原来所在的位置，并使用新的速度
					tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine)
					tmpAsteroid.y = tmpAsteroid.y + (y * cosine + x * sine)

					tmpAsteroidB.x = tmpAsteroid.x + (xb * cosine - yb * sine)
					tmpAsteroidB.y = tmpAsteroid.y + (yb * cosine + xb * cosine)

					tmpAsteroid.vx = vx * cosine - vy * sine
					tmpAsteroid.vy = vy * cosine + vx * sine

					tmpAsteroidB.vx = vxb * cosine - vyb * sine
					tmpAsteroidB.vy = vyb * cosine + vxb * sine

				}
			}
			tmpAsteroid.x += tmpAsteroid.vx
			tmpAsteroid.y += tmpAsteroid.vy

			// 最大限制
			if (Math.abs(tmpAsteroid.vx) < 10) {
				tmpAsteroid.vx += tmpAsteroid.ax
			}
			if (Math.abs(tmpAsteroid.vy) < 10) {
				tmpAsteroid.vy += tmpAsteroid.ay
			}
			

			// 边界处理
			if (tmpAsteroid.x - tmpAsteroid.radius < 0) {
				tmpAsteroid.x = tmpAsteroid.radius
				tmpAsteroid.vx *= -1
				tmpAsteroid.ax *= -1
			} else if (tmpAsteroid.x + tmpAsteroid.radius > cavWidth) {
				tmpAsteroid.x = cavWidth - tmpAsteroid.radius
				tmpAsteroid.vx *= -1
				tmpAsteroid.ax *= -1
			}

			if (tmpAsteroid.y - tmpAsteroid.radius < 0) {
				tmpAsteroid.y = tmpAsteroid.radius
				tmpAsteroid.vy *= -1	
				tmpAsteroid.ay *= -1			
			} else if (tmpAsteroid.y + tmpAsteroid.radius > cavHeight) {
				tmpAsteroid.y = cavHeight - tmpAsteroid.radius
				tmpAsteroid.vy *= -1
				tmpAsteroid.ay *= -1
			}

			ctx.beginPath()
			ctx.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI * 2, false)
			ctx.closePath()
			ctx.fill()
		}
		if (playAnimation) {
			setTimeout(animate, 33)
		}
	}
	animate()

})

$(function() {
	let canvas = $("#gameCanvas")
	let ctx = canvas.get(0).getContext('2d')

	// 画布尺寸
	let canvasWidth = canvas.width()
	let canvasHeight = canvas.height()

	// 游戏设置
	let playGame

	// 小行星平台变量
	let platformX
	let platformY
	let platformOuterRadius
	let platformInnerRadius

	// 存储所有小行星的数组
	let asteroids

	// 玩家投掷的小行星
	let player
	let playerOriginalX
	let playerOriginalY

	let playerSelected
	let playerMaxAbsVelocity // 最快速度
	let playerVelocityDampener // 储存玩家使用的小行星的速度
	let powerX  // 保存的位置 用于确定1小行星的速度 并在画布上绘制一条直线来表示该速度
	let powerY
	let score 



	let ui = $("#gameUI")
	let uiInfo = $("#gameInfo")
	let uiStats = $("#gameStats")
	let uiComplete = $("#gameComplete")
	let uiPlay = $("#gamePlay")
	let uiReset = $(".gameReset")
	let uiRemaining = $("#gameRemaining")
	let uiScore = $(".gameScore")

	// 小行星
	let Asteroid = function (x, y, radius, mass, friction) {
		this.x = x
		this.y = y
		this.radius = radius
		this.mass = mass  // 质量
		this.friction = friction  // 摩擦力
		this.vx = 0 // 速率
		this.vy = 0	// 速率
		this.player = false
	}

	function resetPlayer () {
		player.x = playerOriginalX
		player.y = playerOriginalY
		player.vx = 0
		player.vy = 0
	}

	// 重置和启动游戏
	function startGame () {
		uiScore.html('0')
		uiStats.show()
		// 初始游戏设置
		playGame = false

		platformX = canvasWidth / 2
		platformY = 150
		platformOuterRadius = 100
		platformInnerRadius = 75

		asteroids = []

		// 玩家的一些参数
		playerSelected = false
		playerMaxAbsVelocity = 30
		playerVelocityDampener = 0.3
		powerX = -1
		powerY = -1
		score = 0

		let pRadius = 15
		let pMass = 10
		let pFrication = 0.97
		playerOriginalX = canvasWidth / 2
		playerOriginalY = canvasHeight - 150
		player = new Asteroid(playerOriginalX, playerOriginalY, pRadius, pMass, pFrication)
		player.player = true
		asteroids.push(player)


		let outerRing = 8 // 外圈上的小行星数目
		let ringCount = 3 // 圈数
		let ringSpace = (platformInnerRadius / (ringCount - 1)) // 每个圈之间的距离

		for (let r = 0; r < ringCount; r++) {
			let currentRing = 0 // 当前圈上的小行星数目
			let angle = 0 // 每个小行星之间的角度
			let ringRadius = 0

			// 是否是最里面的圈
			if (r == ringCount - 1) {
				currentRing = 1
			} else {
				currentRing = outerRing - (r * 3)
				angle = 360 / currentRing
				ringRadius = platformInnerRadius - (ringSpace * r)
			}

			// 遍历每个小行星
			for (let a = 0; a < currentRing; a++) {
				let x = 0
				let y = 0

				// 是否是最里面的圈
				if (r == ringCount - 1) {
					x = platformX
					y = platformY					
				} else {
					x = platformX + (ringRadius * Math.cos((angle * a) * (Math.PI / 180)))
					y = platformY + (ringRadius * Math.sin((angle * a) * (Math.PI / 180)))
				}

				let radius = 10
				let mass = 5
				let friction = 0.95
				asteroids.push(new Asteroid(x, y, radius, mass, friction))
			}
		}

		uiRemaining.html(asteroids.length -1)

		// 事件监听
		$(window).mousedown(function(e) {
			if (!playerSelected && player.x == playerOriginalX && player.y == playerOriginalY) {
				let canvasOffset = canvas.offset()
				console.log(canvasOffset)
				let canvasX = Math.floor(e.pageX - canvasOffset.left)
				let canvasY = Math.floor(e.pageY - canvasOffset.top)

				if (!playGame) {
					playGame = true
					animate()
				}

				let dx = player.x - canvasX
				let dy = player.y - canvasY
				let distance = Math.sqrt((dx * dx) + (dy * dy))
				let padding = 5

				if (distance < player.radius + padding) {
					powerX = player.x
					powerY = player.y
					playerSelected = true
				}
			}
		})

		$(window).mousemove(function(e) {
			if (playerSelected) {
				let canvasOffset = canvas.offset()
				let canvasX = Math.floor(e.pageX - canvasOffset.left)
				let canvasY = Math.floor(e.pageY - canvasOffset.top)

				let dx = canvasX - player.x
				let dy = canvasY - player.y
				let distance = Math.sqrt((dx * dx) + (dy * dy)) 

				if (distance * playerVelocityDampener < playerMaxAbsVelocity) {
					powerX = canvasX
					powerY = canvasY
				} else {
					let ratio = playerMaxAbsVelocity / (distance * playerVelocityDampener)
					powerX = player.x + dx * ratio
					powerY = player.y + dy * ratio
				}
			}
		})

		$(window).mouseup(function(e) {
			if (playerSelected) {
				let dx = powerX - player.x
				let dy = powerY - player.y
				player.vx = -(dx * playerVelocityDampener)
				player.vy = -(dy * playerVelocityDampener)

				uiScore.html(++score)
			}
			playerSelected = false
			powerX = -1
			powerY = -1
		})

		// 开始动画循环
		animate()
	}

	// 初始化游戏环境
	function init () {
		uiStats.hide()
		uiComplete.hide()

		uiPlay.click(function(e) {
			e.preventDefault()
			uiInfo.hide()
			startGame()
		})

		uiReset.click(function(e) {
			e.preventDefault()
			uiComplete.hide()
			startGame()
		})
	}

	// 动画循环
	function animate () {
		// 清除
		ctx.clearRect(0, 0, canvasWidth, canvasHeight)

		// 画平台
		ctx.fillStyle = "rgb(100, 100, 100)"
		ctx.beginPath()
		ctx.arc(platformX, platformY, platformOuterRadius, 0, Math.PI * 2, true)
		ctx.closePath()
		ctx.fill()

		if (playerSelected) {
			ctx.strokeStyle = "rgb(255, 255, 255)"
			ctx.lineWidth = 3
			ctx.beginPath()
			ctx.moveTo(player.x, player.y)
			ctx.lineTo(powerX, powerY)
			ctx.closePath()
			ctx.stroke()
		}		

		ctx.fillStyle = 'rgb(255, 255, 255)'

		let deadAsteroids = new Array()
		let asteroidsLength = asteroids.length
		for(let i = 0; i < asteroidsLength; i++) {
			let tmpAsteroid = asteroids[i]

			for (let j = i + 1; j < asteroidsLength; j++) {
				let tmpAsteroidB = asteroids[j]

				// 碰撞代码 计算
				let dx = tmpAsteroidB.x - tmpAsteroid.x
				let dy = tmpAsteroidB.y - tmpAsteroid.y
				let distance = Math.sqrt((dx * dx) + (dy * dy))

				if (distance < tmpAsteroid.radius + tmpAsteroidB.radius) {
					let angle = Math.atan2(dy, dx)
					let sine = Math.sin(angle)
					let cosine = Math.cos(angle)

					// 旋转小行星的位置
					let x = 0
					let y = 0

					// 旋转小行星B的位置
					let xb = dx * cosine + dy * sine
					let yb = dy * cosine - dx * sine

					// 旋转小行星的速度
					let vx = tmpAsteroid.vx * cosine + tmpAsteroid.vy * sine
					let vy = tmpAsteroid.vy * cosine - tmpAsteroid.vx * sine

					// 旋转小行星B的速度
					let vxb = tmpAsteroidB.vx * cosine + tmpAsteroidB.vy * sine
					let vyb = tmpAsteroidB.vy * cosine - tmpAsteroidB.vx * sine

					// 保持重量 (采用动量守恒定律)
					let vTotal = vx - vxb
					vx = ((tmpAsteroid.mass - tmpAsteroidB.mass) * vx + 2 * tmpAsteroidB.mass * vxb)
									/ (tmpAsteroid.mass + tmpAsteroidB.mass)
					vxb = vTotal + vx

					// 将小行星分开
					xb = x + (tmpAsteroid.radius + tmpAsteroidB.radius)

					// 转回小行星的位置
					tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine)
					tmpAsteroid.y = tmpAsteroid.y + (y * cosine + x * sine)

					tmpAsteroidB.x = tmpAsteroid.x + (xb * cosine - yb * sine)
					tmpAsteroidB.y = tmpAsteroid.y + (yb * cosine + xb * sine)

					// 转回小行星的速度
					tmpAsteroid.vx = vx * cosine - vy * sine
					tmpAsteroid.vy = vy * cosine + vx * sine

					tmpAsteroidB.vx = vxb * cosine - vyb * sine
					tmpAsteroidB.vy = vyb * cosine + vxb * sine
				}
			}

			// 计算新位置
			tmpAsteroid.x += tmpAsteroid.vx 
			tmpAsteroid.y += tmpAsteroid.vy

			// 摩擦力
			if (Math.abs(tmpAsteroid.vx) > 0.1) {
				tmpAsteroid.vx *= tmpAsteroid.friction
			} else {
				tmpAsteroid.vx = 0
			}
 			
 			if (Math.abs(tmpAsteroid.vy) > 0.1) {
 				tmpAsteroid.vy *= tmpAsteroid.friction
 			} else {
 				tmpAsteroid.vy = 0
 			}

 			// 平台检测
 			if (!tmpAsteroid.player) {
 				let dxp = tmpAsteroid.x - platformX
 				let dyp = tmpAsteroid.y - platformY
 				let distanceP = Math.sqrt(dxp * dxp + dyp * dyp)

 				if (distanceP > platformOuterRadius) {
 					// 小行星死亡
 					if (tmpAsteroid.radius > 0) {
 						tmpAsteroid.radius -= 2
 					} else {
 						deadAsteroids.push(tmpAsteroid)
 					}
 				}
 			}

 			if (player.x != playerOriginalX && player.y != playerOriginalY) {
				if (player.vx == 0 && player.vy == 0) {
					resetPlayer()
				} else if (player.x + player.radius < 0) {
					resetPlayer()
				} else if (player.x - player.radius > canvasWidth) {
					resetPlayer()
				} else if (player.y + player.radius < 0) {
					resetPlayer()
				} else if (player.y - player.radius > canvasHeight) {
					resetPlayer()
				}
			}

			ctx.beginPath()
			ctx.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI * 2, true)
			ctx.closePath()
			ctx.fill()
		}

		let deadAsteroidsLength = deadAsteroids.length
		if (deadAsteroidsLength > 0) {
			for (let di = 0; di < deadAsteroidsLength; di++) {
				let tmpDeadAsteroid = deadAsteroids[di]
				asteroids.splice(asteroids.indexOf(tmpDeadAsteroid), 1)
			}

			let remaining = asteroids.length - 1
			uiRemaining.html(remaining)

			if (remaining == 0) {
				// 赢了
				playGame = false
				uiStats.hide()
				uiComplete.show()

				$(window).unbind("mousedown")
				$(window).unbind("mousemove")
				$(window).unbind("mouseup")
			}
		}

		if (playGame) {
			// 33ms 再次运行动画循环
			setTimeout(animate, 33)
		}
	}

	init()
})
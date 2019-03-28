/**
 * 泡泡堂游戏
 */

// 只涉及2个玩家 实现

/*function Player (name) {
	this.name = name
	this.ememy = null // 敌人
}

Player.prototype.win = function () {
	console.log(this.name + ' won ')
}

Player.prototype.lose = function () {
	console.log(this.name + ' lost ')
}

Player.prototype.die = function () {
	this.lose()
	this.ememy.win()
}

let player1 = new Player('1号种子')
let player2 = new Player('2号种子')

player1.ememy = player2
player2.ememy = player1

player1.die()*/

//  多个玩家的实现

// let players = [] // 用来保存所有玩家

	/**
	 * [Player description] 玩家对象的属性包括 队友列表 敌人列表 玩家当前状态 角色名字 以及玩家所在队伍的颜色
	 * @param {[type]} name      [description]
	 * @param {[type]} teamColor [description]
	 */
/*function Player (name, teamColor) {
 	this.partners = [] // 队友列表
 	this.ememies = [] // 敌人列表
 	this.status = 'live' // 玩家状态
 	this.name = name  // 玩家姓名
 	this.teamColor = teamColor // 队伍颜色
}

Player.prototype.win = function () {  // 玩家团队胜利
 	console.log('winner: ' + this.name)
}

Player.prototype.lose = function () {  // 玩家团队失败
 	console.log('loser: ' + this.name)
}*/

/**
 * [die description] 在每个玩家死亡的时候都要遍历他的队友是否全部死亡 如是 则这局游戏失败
 * @return {[type]} [description]
 */
/*Player.prototype.die = function () {  // 玩家死亡
	let all_dead = true
	this.status = 'dead'

	for (let i = 0, partner; partner = this.partners[i++];) {
		// 遍历队友列表
		if (partner.status !== 'dead') {  // 如果有一个队友没死亡 则游戏还未失败
			all_dead = false
			break
		}

		if (all_dead === true) { // 如果全队死亡
			this.lose() // 通知自己游戏失败

			for (let j = 0, partner; partner = this.partners[j++];) { // 通知其它所有玩家游戏失败
				partner.lose()
			}

			for (let k = 0, ememy; ememy = this.ememies[k++];) { // 通知所有敌人游戏胜利
				ememy.win()
			}

		}
	}
}*/

// 最后定义一个工厂模式来创建玩家

/*let playerFactory = function(name, teamColor) {
	let newPlayer = new Player(name, teamColor) // 创建新玩家

	for (let i = 0, player; player = players[i++];) { // 通知所有玩家 有新角色加入
		if (player.teamColor === newPlayer.teamColor) { // 如果是同一队的玩家
 			player.partners.push(newPlayer) // 相互添加到队友列表
 			newPlayer.partners.push(player)
		} else {
			player.ememies.push(newPlayer) // 相互添加到敌人列表
			newPlayer.ememies.push(player)
		}
	}

	players.push(newPlayer)

	return newPlayer
}*/


// 测试

// 红队
/*let player1 = playerFactory('皮蛋', 'red')
let player2 = playerFactory('小乖', 'red')
let player3 = playerFactory('宝宝', 'red')
let player4 = playerFactory('小强', 'red')*/

// 蓝队
/*let player5 = playerFactory('黑妞', 'blue')
let player6 = playerFactory('葱头', 'blue')
let player7 = playerFactory('胖墩', 'blue')
let player8 = playerFactory('海盗', 'blue')*/

//console.log(players)

// 让红队玩家全死亡
/*player1.die()
player3.die()
player4.die()
player2.die()*/



/**
 * 使用中介者来实现泡泡堂
 * 	首先仍然是定义Player构造函数和player对象的原型方法，在原型方法中不在负责具体的执行逻辑
 * 	而是把操作转交给中介者，我们把中介者对象命名为playerDirector
 */

function Player (name, teamColor) {
	this.name = name
	this.teamColor = teamColor
	this.status = 'live'
}

Player.prototype.win = function () {
	console.log(this.name + ' won ')
}

Player.prototype.lose = function () {
	console.log(this.name + ' lost ')
}


/************玩家死亡**********/
Player.prototype.die = function () {
	this.status = 'dead'
	playerDirector.ReceiverMessage('playerDead', this) // 给中介者发送消息， 玩家死亡
}

/************移除玩家**********/
Player.prototype.remove = function () {
	playerDirector.ReceiverMessage('removePlayer', this) // 给中介者发送消息， 移除一个玩家
}

/************玩家换队**********/
Player.prototype.changeTeam = function (color) {
	playerDirector.ReceiverMessage('changeTeam', this, color) // 给中介者发送消息，玩家换队
}


// 工厂函数
let playerFactory = function (name, teamColor) {
	let newPlayer = new Player(name, teamColor)  // 创造一个新的玩家信息
	playerDirector.ReceiverMessage('addPlayer', newPlayer) // 给中介者发送消息，新增玩家

	return newPlayer
}


// 中介者实现 
//  playerDirector 开放一个对外暴露的接口ReceiverMessage, 负责接收player发送的消息
//  而player发消息的时候总是把自身this传递给playerDirector，以便playerDirector识别是哪个玩家
 
let playerDirector = (function() {
	let players = {} // 保存所有玩家
	let opeartions = {} // 中介者可以执行的操作

	/************新增一个玩家**********/
	opeartions.addPlayer = function (player) {
		let teamColor = player.teamColor // 玩家的队伍颜色
		players[teamColor] = players[teamColor] || [] // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍

		players[teamColor].push(player) // 添加玩家进队伍
	}

	/************移除一个玩家**********/
	opeartions.removePlayer = function (player) {
		let teamColor = player.teamColor
		let teamPlayers = players[teamColor] || []  // 该队伍的所有成员

		for (let i = teamPlayers.length - 1; i >= 0; i--) {
			if (teamPlayers[i] === player) {
				teamPlayers.splice(i, 1)
			}
		}
	}

	/************玩家换队**********/
	opeartions.changeTeam = function (player, newTeamColor) {
		opeartions.removePlayer(player) // 从原队伍中删除
		player.teamColor = newTeamColor  // 改变队伍颜色
		opeartions.addPlayer(player) // 添加到新的队伍中
	}

	/************玩家死亡**********/
	opeartions.playerDead = function (player) {
		let teamColor = player.teamColor
		let teamPlayers = players[teamColor] // 玩家所在的队伍
		let all_dead = true

		for (let i = 0, player; player = teamPlayers[i++];) {
			if (player.status !== 'dead') {
				all_dead = false
				break
			}
		}

		if (all_dead === true) { // 全部死亡
			for (let j = 0, player; player = teamPlayers[j++];) {
				player.lose()  // 本队所有玩家 lose
			}

			for (let color in players) {
				if (color !== teamColor) {
					let teamPlayers = players[color] // 其它队伍的玩家

					for (let k = 0, player; player = teamPlayers[k++];) {
						player.win() // 其它队伍所有玩家win
					}
				}
			}
		}
	}

	let ReceiverMessage = function () {
		let message = Array.prototype.shift.call(arguments) // 获取arguments 的第一个参数
		opeartions[message].apply(this, arguments)
	}

	return {
		ReceiverMessage
	}
})()


// 红队
let player1 = playerFactory('皮蛋', 'red')
let player2 = playerFactory('小乖', 'red')
let player3 = playerFactory('宝宝', 'red')
let player4 = playerFactory('小强', 'red')

// 蓝队
let player5 = playerFactory('黑妞', 'blue')
let player6 = playerFactory('葱头', 'blue')
let player7 = playerFactory('胖墩', 'blue')
let player8 = playerFactory('海盗', 'blue')

// 让红队玩家全死亡
// player1.die()
// player3.die()
// player4.die()
// player2.die()

// 假设皮蛋和小乖掉线

// player1.remove()
// player2.remove()
// player3.die()
// player4.die()

// 假设皮蛋叛变
player1.changeTeam('blue')
player3.die()
player4.die()
player2.die()
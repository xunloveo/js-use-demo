/**
 * 好莱坞原则： 不同于模板方法模式，它不需要使用继承 而是高级组件调用低级组件
 *
 *	 Beverage函数被调用之后返回构造器F，F类中包含了模板方法F.prototype.init
 *	 	效果跟继承一样
 *
 * 	brew 等方法子类必须重写 否则会抛出异常
 */

let Beverage = function (param) {
	let boliWater = function () {
		console.log('把水煮沸')
	}

	let brew = param.brew || function () {
		throw new Error('必须传递brew方法')
	}

	let pourInCup = param.pourInCup || function () {
		throw new Error('必须传递pourInCup方法')
	}

	let addCondiments = param.addCondiments || function () {
		throw new Error('必须传递addCondiments方法')
	}

	let F = function () {}

	F.prototype.init = function () {
		boliWater()
		brew()
		pourInCup()
		addCondiments()
	}

	return F
}

let Coffee = Beverage({
	// brew: function () {
	// 	console.log('用沸水冲泡咖啡')
	// },
	pourInCup: function () {
		console.log('把咖啡倒进杯子')
	},
	addCondiments: function () {
		console.log('加糖和牛奶')
	}
})

let coffee = new Coffee()
coffee.init()
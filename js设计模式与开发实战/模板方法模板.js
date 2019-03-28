/**
 * Example: coffee or tea
 */

/* 先泡一杯咖啡的例子：
	1. 把水煮沸
	2. 用沸水泡咖啡
	3. 把咖啡倒进杯子
	4. 加糖和牛奶
*/
 
 // 代码实现：
 
 let Coffee = function() {}

 Coffee.prototype.boilWater = function () {
 	console.log('把水煮沸')
 }

 Coffee.prototype.brewCoffeeGriends = function () {
 	console.log('用沸水泡咖啡')
 }

 Coffee.prototype.pourInCup = function () {
 	console.log('把咖啡倒进杯子')
 }

 Coffee.prototype.addSugarAndMilk = function () {
 	console.log('加入糖和牛奶')
 }

 Coffee.prototype.init = function () {
 	this.boilWater()
 	this.brewCoffeeGriends()
 	this.pourInCup()
 	this.addSugarAndMilk()
 }

 let coffee = new Coffee()
 coffee.init()


 /* 泡一壶茶的例子：
 	1. 把水煮沸
 	2. 用沸水浸泡茶叶
 	3. 把茶水倒进杯子
 	4. 加柠檬
 */

// 代码实现

let Tea = function () {}

Tea.prototype.boilWater = function () {
	console.log('把水煮沸')
}

Tea.prototype.steepTeaBag = function () {
	console.log('用沸水浸泡茶叶')
}

Tea.prototype.pourInCup = function () {
	console.log('把茶水倒进杯子')
}

Tea.prototype.addLemon = function () {
	console.log('加入柠檬')
}

Tea.prototype.init = function () {
	this.boilWater()
	this.steepTeaBag()
	this.pourInCup()
	this.addLemon()
}
let tea = new Tea()
tea.init()

/**
 * 分析： 
 * 	这两者的不同点：
 * 		1. 原料不同 (咖啡 茶)
 * 		2. 泡的方式不同 （冲泡 浸泡）
 * 		3. 加入的调料不同 （糖+牛奶 柠檬)
 *
 * 	抽象以后 分为以下步骤：
 * 		1. 把水煮沸
 * 		2. 用沸水浸泡原料
 * 		3. 把原料倒进杯子
 * 		4. 加调料 
 *
 * 	把这些原料 统称为 Beverage
 */

// 代码实现

let Beverage = function () {}

Beverage.prototype.boilWater = function () {
	console.log('把水煮沸')
}

Beverage.prototype.brew = function () {}  // 空方法， 由子类自己实现

Beverage.prototype.pourInCup = function () {} // 由子类重写

Beverage.prototype.addCondiments = function () {} // 由子类重写

Beverage.prototype.init = function () {
	this.boilWater()
	this.brew()
	this.pourInCup()
	this.addCondiments()
}

// 创建Coffee1类 并继承Beverage
let Coffee1 = function () {}
Coffee1.prototype = new Beverage()

// 重写brew方法
Coffee1.prototype.brew = function () {
	console.log('用沸水泡咖啡')
}

Coffee1.prototype.pourInCup = function () {
	console.log('把咖啡倒进杯子')
}

Coffee1.prototype.addCondiments = function () {
	console.log('加入糖和牛奶')
}

console.log("********************************")
console.log("********************************")

let coffee1 = new Coffee1()
coffee1.init()


// 创建tea类 并继承Beverage

let Tea1 = function () {}
Tea1.prototype = new Beverage()

Tea1.prototype.brew = function () {
	console.log('用沸水浸泡茶叶')
}

Tea1.prototype.pourInCup = function () {
	console.log('把茶倒进杯子')
}

Tea1.prototype.addCondiments = function () {
	console.log('加柠檬')
}

let tea1 = new Tea1()
tea1.init()
// 类和接口操作
interface Alarm {
  alert()
}

interface Light {
  lightOn()
  lightOff()
}

class Door {}

class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor alert')
  }
}

class Car implements Alarm {
  alert() {
    console.log('Car alert')
  }
  // 一个类可以实现多个接口
  lightOn() {
    console.log('Car lightOn')
  }
  lightOff() {
    console.log('Car lightOff')
  }
}

let sd = new SecurityDoor()
sd.alert()
let car = new Car()
car.alert()
car.lightOn()
car.lightOff()

// 混合类型
// 使用接口的方式定义一个函数需要符合的行状
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1
}

console.log(mySearch('abc', 'c'))

// 一个函数还可以有自己的属性和方法
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {}
  counter.interval = 123
  counter.reset = function() {
    console.log('reset')
  }
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0

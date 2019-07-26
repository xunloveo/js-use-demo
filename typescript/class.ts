// 抽象类 使用abstract定义抽象类和抽象方法
// 抽象类不能被实现话 抽象类中的抽象方法必须被子类实现

abstract class Animal {
  public name
  public constructor(name) {
    this.name = name
  }

  public abstract sayHi()
}

class Cat extends Animal {
  public eat() {
    console.log(`${this.name} is eating`)
  }
  // 必须实现这个方法 否则会报错
  public sayHi() {
    console.log(`My name is ${this.name}`)
  }
}

let cat = new Cat('Tom')
cat.sayHi()
cat.eat()

// 类的类型
class Dog {
  name: string
  constructor(name: string) {
    this.name = name
  }
  sayHi(): string {
    return `My name is ${this.name}`
  }
}

let dog = new Dog('dog')
console.log(dog.sayHi())

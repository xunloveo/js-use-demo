// 抽象类 使用abstract定义抽象类和抽象方法
// 抽象类不能被实现话 抽象类中的抽象方法必须被子类实现
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.eat = function () {
        console.log(this.name + " is eating");
    };
    // 必须实现这个方法 否则会报错
    Cat.prototype.sayHi = function () {
        console.log("My name is " + this.name);
    };
    return Cat;
}(Animal));
var cat = new Cat('Tom');
cat.sayHi();
cat.eat();
// 类的类型
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.sayHi = function () {
        return "My name is " + this.name;
    };
    return Dog;
}());
var dog = new Dog('dog');
console.log(dog.sayHi());

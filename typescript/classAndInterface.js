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
var Door = /** @class */ (function () {
    function Door() {
    }
    return Door;
}());
var SecurityDoor = /** @class */ (function (_super) {
    __extends(SecurityDoor, _super);
    function SecurityDoor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecurityDoor.prototype.alert = function () {
        console.log('SecurityDoor alert');
    };
    return SecurityDoor;
}(Door));
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.alert = function () {
        console.log('Car alert');
    };
    // 一个类可以实现多个接口
    Car.prototype.lightOn = function () {
        console.log('Car lightOn');
    };
    Car.prototype.lightOff = function () {
        console.log('Car lightOff');
    };
    return Car;
}());
var sd = new SecurityDoor();
sd.alert();
var car = new Car();
car.alert();
car.lightOn();
car.lightOff();
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
console.log(mySearch('abc', 'c'));
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () {
        console.log('reset');
    };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

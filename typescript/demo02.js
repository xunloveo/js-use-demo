var Student = /** @class */ (function () {
    // 构造函数参数上使用public等同于创建了同名的成员变量
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName + " " + person.middleInitial;
}
var user = new Student("Jane", 'M.', "User");
document.body.innerHTML = greeter(user);

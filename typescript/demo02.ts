class Student {
	fullName: string;

	// 构造函数参数上使用public等同于创建了同名的成员变量
	constructor(public firstName, public middleInitial, public lastName) {
	this.fullName = firstName + " " + middleInitial + " " + lastName;
	}
}

interface Person {
	firstName: string;
	lastName: string;
	middleInitial: string
}

function greeter(person: Person) {
	return "Hello, " + person.firstName + " " + person.lastName + " " + person.middleInitial;
}

let user = new Student("Jane", 'M.', "User");

document.body.innerHTML = greeter(user);
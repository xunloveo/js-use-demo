let isDone: boolean = false

// 使用构造函数 Boolean 创造的对象不是布尔值
// let createdByNewBoolean: boolean = new Boolean(1)

// 事实上new Boolean() 返回的是一个 Boolean 对象
let createdByNewBoolean: Boolean = new Boolean(1)

// 直接调用 Boolean也可以返回一个 boolean 类型
let createdByBoolean: boolean = Boolean(1)

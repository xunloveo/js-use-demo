let map = document.querySelector('#map')

let food = new Food()
food.render(map)
food.random()

let snake = new Snake()
snake.render(map)
// 轮播图 操作  无缝滚动原理 复制第一张到最后

// 0. 获取元素
var box = document.getElementById('box')
var screen = box.children[0];
var ul = screen.children[0];
var ol = screen.children[1];

var arr = box.children[1];
var leftArr = arr.children[0];
var rightArr = arr.children[1];

// 图片的宽度
var imgWidth = screen.offsetWidth;

// 1. 动态生成序号
// 获取图片的个数 
var count = ul.children.length;
var i = 0;
for(; i < count; i++) {
	// 创建序号
	var li = document.createElement('li');
	ol.appendChild(li);
	//li.setAttribute('data-index', i);

	// 记录自己的索引
	li.index = i;

	// 4. 点击序号切换图片
	li.onclick = liClick;

	// 让第一个默认选中
	if (i == 0) {
		li.className = 'active';
	}
}

// 设置ol margin-left 为宽度的一半 使其水平居中

ol.style.marginLeft = -ol.offsetWidth / 2 + 'px';

// 2 鼠标经过显示箭头 离开隐藏箭头
box.onmouseover = function() {
	clearInterval(timer)
	arr.style.display = 'block';
}
box.onmouseout = function() {
	arr.style.display = 'none';
	autoPlay()
}

// 3. 点击箭头实现上一张和下一张功能
var index = 0; // 默认第一张索引
// 下一张
function rightClick() {
	index++;
	if (index < count) {
		//animate(ul, -index * imgWidth)
		// 这里委托给序号实现
		// 让序号高亮显示 
		ol.children[index].click()
	} else {
		animate(ul, -(index + 1) * imgWidth, function() {
			index = 0	
			// ul.style.left = '0'
			ul.style.left = -imgWidth + 'px'
		})		
		// 序号高亮显示
		for(i = 0; i < count; i++) {
			ol.children[i].className = '';
		}
		ol.children[0].className = 'active';
	}
}
rightArr.onclick = rightClick

// 上一张
leftArr.onclick = function () {
	index--;
	console.log(index)
	if (index >= 0) {
		ol.children[index].click();
	} else {
		animate(ul, 0 * imgWidth, function() {
			console.log(count)
			index = count - 1;
			ul.style.left = -count * imgWidth + 'px'
		})
		// 序号高亮显示
		for(i = 0; i < count; i++) {
			ol.children[i].className = '';
		}
		ol.children[count - 1].className = 'active';
	}
}

function liClick () {
	index = this.index; // 记录索引
	// 让图片以动画的方式移动	
	animate(ul, -(this.index + 1) * imgWidth);

	// 序号高亮显示
	for(i = 0; i < count; i++) {
		ol.children[i].className = '';
	}
	this.className = 'active';
}

/**
 * [animate description] 动画封装
 * @param  {[type]} element [description] 动画元素
 * @return {[type]}         [description]
 */
function animate(element, target, cb) {	
	if (element.timerId) {
		clearInterval(element.timerId)
	}
	let step = 60
	element.timerId = setInterval(function () {			

		let current = element.offsetLeft

		// 如果当前位置大于目标位置 将step取负
		if (current > target) {
			step = -Math.abs(step)
		}

		// 比较是否要到目标位置 通过判断当前位置和目标位置的差值的绝对值 和 step绝对值相比是否小于0 
		if (Math.abs(current - target) < Math.abs(step)) {
			element.style.left = target + 'px'
			clearInterval(element.timerId)

			// 回调函数
			if (cb) {
				cb()
			}
			return false
		}				

		current += step

		element.style.left = current + 'px'

	}, 20)
	
}

// 无缝滚动 复制第一个li 到最后
var cloneLi = ul.children[0].cloneNode(true); 
ul.appendChild(cloneLi)

// 复制倒数第二个到第一个位置
var cloneLiOne = ul.children[count - 1].cloneNode(true)
ul.insertBefore(cloneLiOne, ul.children[0])

// 给 ul 初始化 显示第二张图片 以及 初始化宽度
ul.style.left = -imgWidth + 'px'
ul.style.width = (count + 2) * imgWidth + 'px'

// 5. 自动切换图片
var timer = null
function autoPlay() {
	timer = setInterval(rightClick, 4000)
}

autoPlay()





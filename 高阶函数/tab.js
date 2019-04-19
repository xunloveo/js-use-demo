;(function (window, undefined) {
	// 构造函数Tab
	// 属性
	// 		container 容器
	// 		tabMenuseletecd 选项卡头部选种样式
	// 		tabMainseletecd 内容选中样式
	// 方法
	// 		autoPlay() 自动切换
	
	var _tabMenuList = null
	var _tabMainList = null
	var _that = null
	function Tab({ container = '#wrapper', tabMenuseletecd = 'selected', tabMainseletecd = 'selected' } = {}) {
		this.container = container
		this.tabMenuseletecd = tabMenuseletecd
		this.tabMainseletecd = tabMainseletecd

		_that = this
		// 实现tab栏切换
		_tab.call(this)
	}

	// 实现tab栏切换的功能
	function _tab() {
		// 1. 获取需要元素
		var container = document.querySelector(this.container)
		// tab 头
		var tabMenu = container.children[0]
		// tab 内容
		var tabMain = container.children[1]
		_tabMenuList = tabMenu.children
		_tabMainList = tabMain.children
		// 2. 点击事件
		var i = 0, len = _tabMenuList.length
		for (; i < len; i++) {
			let menu = _tabMenuList[i]
			// 记录索引
			menu.index = i
			menu.onclick = _menuClick
		}
		
	}

	function _menuClick() {
		// 3. 切换tab
		// 取消所有menu 选中效果 让当前点击menu选中
		var i = 0, len = _tabMenuList.length
		for (; i < len; i++) {
			var menu = _tabMenuList[i]
			menu.className = menu.className.replace(_that.tabMenuseletecd, '')
		}
		// 让当前点击menu选中
		this.className = this.className + ' ' + _that.tabMenuseletecd

		// 4. 切换 内容
		for (i = 0; i < len; i++) {
			var item = _tabMainList[i]
			item.className = item.className.replace(_that.tabMainseletecd, '')
		}
		var index = this.index
		var main = _tabMainList[index]
		main.className = main.className + ' ' + _that.tabMainseletecd
	}

	Tab.prototype.autoPlay = function () {

	}
	window.Tab = Tab
})(window)
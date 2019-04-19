/**
 *  移动端适配写法
 */
(function () {
	let dpr; // 设备像素比
	let rem; // 
	let scale; // 设置缩放

	let docEl = document.documentElement; 
	let styleEl = document.createElement('style');
	let metaEl = document.querySelector('meta[name="viewport"]');
	dpr = window.devicePixelRatio || 1;
	scale = 1 / dpr;
	rem = docEl.clientWidth * dpr / 10;

	// 设置viewport 进行缩放 达到高清效果
	metaEl.setAttribute('content', `width=${dpr * docEl.clientWidth}, 
		initial-scale=${scale}, maxinum-scale=${scale}, 
		mininum-scale=${scale}, user-scalable=no}`);
	// 设置data-dpr 属性 除css hack之用
	docEl.setAttribute('data-dpr', dpr);

	// 动态写入样式
	docEl.firstElementChild.appendChild(styleEl);
	styleEl.innerHTML = `html{font-size: ${rem}px !important;`;

	// px rem 转换
	window.rem2px = (v) => {
		v = parseFloat(v);
		return v * rem;
	}

	window.px2rem = (v) => {
		v = parseFloat(v);
		return v / rem;
	}

	window.dpr = dpr;
})();
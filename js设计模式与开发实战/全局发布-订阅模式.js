let Event = (function () {
	let clientList = {}
	let listen
	let trigger
	let remove

	listen = function (fn ,key) {
		if (!clientList[key]) {
			clientList[key] = []
		}
		clientList[key].push(fn)
	}

	trigger = function () {
		let key = Array.prototype.shift.call(arguments)
		let fns = clientList[key]
		if (!fns || fns.length === 0) {
			return false
		}
		for (let i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments)
		}
	}

	remove = function(key, fn) {
		let fns = clientList[key]
		if (!fns) {
			return false
		}
		if (!fn) {
			fns && (fns.length = 0)
		} else {
			for (let j = fns.length - 1; j >= 0; j--) {
				let _fn = fns[j]

				if (_fn === fn) {
					fns.splice(j, 1)
				}
			}
		}
	}

	return {
		listen,
		trigger,
		remove
	}
})()
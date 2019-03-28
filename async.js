class Api {
	constructor () {
		this.user = {id: 1, name: 'test'}
		this.friends = [this.user, this.user, this.user]
		this.photo = 'not a real photo'
	}

	getUser () {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(this.user), 200)
		})
	}

	getFriends (userId) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(this.friends), 200)
		})
	}

	getPhoto (userId) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(this.photo), 10)
		})
	}

	throwError () {
		return new Promise((resolve, reject) => {
			setTimeout(() => reject(new Error('error')), 200)
		})
	}
}

async function asyncAwaitIsYourNewBestFriend() {
	const api = new Api()
	const user = await api.getUser()
	const friends = await api.getFriends(user.id)
	const photo = await api.getPhoto(user.id)
	console.log('asyncAwaitIsYourNewBestFriend', {user, friends, photo})
}

//asyncAwaitIsYourNewBestFriend()

//console.log('并行操作。。。。。')

// 并行操作 获取每个用户的朋友列表
async function asyncAwaitLoopsParallel() {
	const api = new Api()
	const user = await api.getUser()
	const friends = await api.getFriends(user.id)
	const friendPromise = friends.map(friend => api.getFriends(friend.id))
	const moreFriends = await Promise.all(friendPromise)
	console.log('asyncAwaitLoopsParallel', moreFriends)
}

//asyncAwaitLoopsParallel()

// 错误处理
async function asyncAwaitTryCatch() {
	try {
		const api = new Api()
		const user = await api.getUser()
		const friends = await api.getFriends()

		await api.throwError()
		console.log('error was not thrown')

		const photo = await api.getPhoto(user.id)
		console.log('async/await', {user, freinds, photo})
	} catch (err) {
		console.log(err)
	}
}

//asyncAwaitTryCatch()

// 组合
async function getUserInfo() {
	const api = new Api()
	const user = await api.getUser()
	const friends = await api.getFriends(user.id)
	const photo = await api.getPhoto(user.id)

	return {user, friends, photo}
}

function promiseUserInfo() {
	getUserInfo().then(({user, friends, photo}) => {
		console.log('promiseUserInfo', {user, friends, photo})
	})
}

promiseUserInfo()

async function awaitUserInfo() {
	const {user, friends, photo} = await getUserInfo()https://mini.eastday.com/a/njump.html?id=n190212081958017&qid=03123
	//const info = await getUserInfo()
	console.log('awaitUserInfo', friends)
}

awaitUserInfo()

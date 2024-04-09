
	// saveAllToStorage(key, data) {
	// 	window.localStorage.setItem(key, JSON.stringify(data))
	// 	return localStorage
	// }

	saveAllToStorage(data) {
		for (let key in data) {
			// const key = localStorage.key(i)
			window.localStorage.setItem(key, JSON.stringify(data[key]))
		}
		return localStorage
	}

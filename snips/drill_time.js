	formatTime() {
		let time = this.time
		if (time !== undefined){
			let hours = time.getHours().toString().padStart(2, '0')
			let minutes = time.getMinutes().toString().padStart(2, '0')
			this.time = `${hours}:${minutes}`
		}
		return this.time
		// let dateTime = this.time
	}

	formatDate() {
		let date = this.date
		if (date !== undefined){
			const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		this.date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
		}
		return this.date
	}

export class Storage {
	saveDrillToStorage(drill) {
		window.localStorage.setItem('time', JSON.stringify(drill.time));
		window.localStorage.setItem('swimTime', JSON.stringify(drill.swimTime));
		window.localStorage.setItem('runTime', JSON.stringify(drill.runTime));
		window.localStorage.setItem('bikeTime', JSON.stringify(drill.bikeTime));
		return localStorage;
	}

	saveTrainingToStorage(training) {
		window.localStorage.setItem('date', JSON.stringify(training.date));
		window.localStorage.setItem('location', JSON.stringify(training.location));
		return localStorage;
	}

	loadLocalStorage(key) {
		let data = window.localStorage.getItem(key);
		data = JSON.parse(data);
		return data;
	}

	loadAllLocalStorage() {
		const allItems = {};
		const keys = ['date', 'location', 'time', 'swimTime', 'runTime', 'bikeTime'];
		for (const aKey of keys) {
			const data = window.localStorage.getItem(aKey);
			if (data !== null) {
				const serialized_value = JSON.parse(data);
				allItems[aKey] = serialized_value;
			}
		}
		return allItems;
	}
}

export const STORAGE_KEYS = {
	date: 'date',
	location: 'location',
	time: 'time',
	swimTime: 'swimTime',
	runTime: 'runTime',
	bikeTime: 'bikeTime',
};

export class Storage {
	saveDrillToStorage(drill) {
		window.localStorage.setItem(STORAGE_KEYS.time, JSON.stringify(drill.time));
		window.localStorage.setItem(STORAGE_KEYS.swimTime, JSON.stringify(drill.swimTime));
		window.localStorage.setItem(STORAGE_KEYS.runTime, JSON.stringify(drill.runTime));
		window.localStorage.setItem(STORAGE_KEYS.bikeTime, JSON.stringify(drill.bikeTime));
		return window.localStorage;
	}

	saveTrainingToStorage(training) {
		window.localStorage.setItem(STORAGE_KEYS.date, JSON.stringify(training.date));
		window.localStorage.setItem(STORAGE_KEYS.location, JSON.stringify(training.location));
		return window.localStorage;
	}

	saveById(id, payload) {
		window.localStorage.setItem(id, JSON.stringify(payload));
		return window.localStorage;
	}

	loadLocalStorage(key) {
		const data = window.localStorage.getItem(key);
		return data === null ? null : JSON.parse(data);
	}

	loadAllLocalStorage(keys = Object.values(STORAGE_KEYS)) {
		const allItems = {};
		for (const aKey of keys) {
			const data = window.localStorage.getItem(aKey);
			if (data !== null) {
				allItems[aKey] = JSON.parse(data);
			}
		}
		return allItems;
	}
}

export default Storage;

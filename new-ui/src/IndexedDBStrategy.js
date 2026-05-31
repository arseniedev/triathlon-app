export class IndexedDBStrategy {
	constructor(dbName = 'TriathlonDB', version = 1) {
		this.dbName = dbName;
		this.version = version;
		this.db = null;
	}

	async initDB() {
		return new Promise((resolve, reject) => {
			const request = window.indexedDB.open(this.dbName, this.version);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => {
				this.db = request.result;
				resolve(this.db);
			};

			request.onupgradeneeded = (event) => {
				const db = event.target.result;

				if (!db.objectStoreNames.contains('trainingSessions')) {
					db.createObjectStore('trainingSessions', { keyPath: 'id', autoIncrement: true });
				}

				if (!db.objectStoreNames.contains('drills')) {
					const drillStore = db.createObjectStore('drills', { keyPath: 'id', autoIncrement: true });
					drillStore.createIndex('trainingId', 'trainingId', { unique: false });
				}
			};
		});
	}

	async saveDrillToStorage(drill) {
		if (!this.db) await this.initDB();

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(['drills'], 'readwrite');
			const store = transaction.objectStore('drills');
			const request = store.add(drill);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve(request.result);
		});
	}

	async saveTrainingToStorage(training) {
		if (!this.db) await this.initDB();

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(['trainingSessions'], 'readwrite');
			const store = transaction.objectStore('trainingSessions');
			const request = store.add(training);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve(request.result);
		});
	}

	async loadLocalStorage(key) {
		if (!this.db) await this.initDB();

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(['drills', 'trainingSessions'], 'readonly');
			const drillStore = transaction.objectStore('drills');
			const trainingStore = transaction.objectStore('trainingSessions');

			const drillRequest = drillStore.getAll();
			const trainingRequest = trainingStore.getAll();

			drillRequest.onerror = () => reject(drillRequest.error);
			trainingRequest.onerror = () => reject(trainingRequest.error);

			Promise.all([
				new Promise(res => {
					drillRequest.onsuccess = () => res(drillRequest.result);
				}),
				new Promise(res => {
					trainingRequest.onsuccess = () => res(trainingRequest.result);
				})
			]).then(([drills, trainings]) => {
				if (drills.length > 0) {
					resolve(drills[drills.length - 1][key]);
				} else if (trainings.length > 0) {
					resolve(trainings[trainings.length - 1][key]);
				} else {
					resolve(null);
				}
			});
		});
	}

	async loadAllLocalStorage() {
		if (!this.db) await this.initDB();

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(['drills', 'trainingSessions'], 'readonly');
			const drillStore = transaction.objectStore('drills');
			const trainingStore = transaction.objectStore('trainingSessions');

			const drillRequest = drillStore.getAll();
			const trainingRequest = trainingStore.getAll();

			drillRequest.onerror = () => reject(drillRequest.error);
			trainingRequest.onerror = () => reject(trainingRequest.error);

			const allData = {};

			drillRequest.onsuccess = () => {
				if (drillRequest.result.length > 0) {
					const lastDrill = drillRequest.result[drillRequest.result.length - 1];
					Object.assign(allData, lastDrill);
				}

				trainingRequest.onsuccess = () => {
					if (trainingRequest.result.length > 0) {
						const lastTraining = trainingRequest.result[trainingRequest.result.length - 1];
						Object.assign(allData, lastTraining);
					}
					resolve(allData);
				};
			};
		});
	}
}

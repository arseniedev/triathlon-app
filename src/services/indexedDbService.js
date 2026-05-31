export default class IndexedDbService {
	constructor(indexedDb = window.indexedDB) {
		this.indexedDb = indexedDb;
		this.db = null;
	}

	open(databaseName, objectStoreName, version = 1) {
		if (!this.indexedDb) {
			return Promise.reject(new Error('IndexedDB is not available'));
		}

		return new Promise((resolve, reject) => {
			const request = this.indexedDb.open(databaseName, version);
			request.onerror = () => reject(request.error || new Error('IndexedDB open failed'));

			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains(objectStoreName)) {
					db.createObjectStore(objectStoreName, { keyPath: 'id' });
				}
			};

			request.onsuccess = () => {
				this.db = request.result;
				resolve(this.db);
			};
		});
	}

	close() {
		if (this.db) {
			this.db.close();
			this.db = null;
		}
	}

	deleteDatabase(databaseName) {
		this.close();
		if (this.indexedDb) {
			this.indexedDb.deleteDatabase(databaseName);
		}
	}
}

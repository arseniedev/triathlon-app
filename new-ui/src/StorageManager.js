import { LocalStorageStrategy } from './LocalStorageStrategy.js';
import { IndexedDBStrategy } from './IndexedDBStrategy.js';

export class StorageManager {
	static instance = null;
	static strategy = null;

	constructor(strategyType = 'localStorage') {
		if (StorageManager.instance) {
			return StorageManager.instance;
		}

		if (strategyType === 'indexedDB') {
			StorageManager.strategy = new IndexedDBStrategy();
		} else {
			StorageManager.strategy = new LocalStorageStrategy();
		}

		StorageManager.instance = this;
	}

	static getInstance(strategyType = 'localStorage') {
		if (!StorageManager.instance) {
			new StorageManager(strategyType);
		}
		return StorageManager.instance;
	}

	static setStrategy(strategyType) {
		if (strategyType === 'indexedDB') {
			StorageManager.strategy = new IndexedDBStrategy();
		} else {
			StorageManager.strategy = new LocalStorageStrategy();
		}
	}

	saveDrillToStorage(drill) {
		return StorageManager.strategy.saveDrillToStorage(drill);
	}

	saveTrainingToStorage(training) {
		return StorageManager.strategy.saveTrainingToStorage(training);
	}

	loadLocalStorage(key) {
		return StorageManager.strategy.loadLocalStorage(key);
	}

	loadAllLocalStorage() {
		return StorageManager.strategy.loadAllLocalStorage();
	}
}

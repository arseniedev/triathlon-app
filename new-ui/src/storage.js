import { StorageManager } from './StorageManager.js';

export class Storage {
	constructor(strategyType = 'localStorage') {
		this.manager = StorageManager.getInstance(strategyType);
	}

	saveDrillToStorage(drill) {
		return this.manager.saveDrillToStorage(drill);
	}

	saveTrainingToStorage(training) {
		return this.manager.saveTrainingToStorage(training);
	}

	loadLocalStorage(key) {
		return this.manager.loadLocalStorage(key);
	}

	loadAllLocalStorage() {
		return this.manager.loadAllLocalStorage();
	}
}

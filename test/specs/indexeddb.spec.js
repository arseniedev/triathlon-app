import Triathlon from '../../src/triathlon_DB';
import { createIndexedDbMock } from '../mocks/indexedDbMock';

describe('IndexedDB integration', () => {
	test('opens database and stores db reference', async () => {
		const indexedDbMock = createIndexedDbMock();
		Object.defineProperty(window, 'indexedDB', {
			value: indexedDbMock,
			writable: true,
			configurable: true,
		});

		const triathlon = new Triathlon();
		const db = await triathlon.manageDatabase('TriathlonDB', 'Athletes', 1);
		expect(db).toBeDefined();
		expect(triathlon.db).toBeDefined();
		expect(window.indexedDB.open).toHaveBeenCalledWith('TriathlonDB', 1);
	});
});

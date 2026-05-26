export function createIndexedDbMock() {
	return {
		open: jest.fn((_name, _version) => {
			const request = {
				result: {
					objectStoreNames: { contains: () => false },
					createObjectStore: jest.fn(),
					close: jest.fn(),
				},
				error: null,
				onerror: null,
				onupgradeneeded: null,
				onsuccess: null,
			};

			setTimeout(() => {
				if (typeof request.onupgradeneeded === 'function') {
					request.onupgradeneeded();
				}
				if (typeof request.onsuccess === 'function') {
					request.onsuccess();
				}
			}, 0);

			return request;
		}),
		deleteDatabase: jest.fn(),
	};
}

export function isLocalStorageAvailable() {
	try {
    const sampleData = '__storage_test__';

    localStorage.setItem(sampleData, sampleData);
    localStorage.removeItem(sampleData);
		return true;
	}
	catch(e) {
		return false;
	}
}

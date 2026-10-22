const storageKey = 'sourbro';

export function loadData() {
    try {
        const savedData = localStorage.getItem(storageKey);

        return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
        console.warn('Could not load Sourbro data.', error);
        return null;
    }
}

export function saveData(data) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
        console.warn('Could not save Sourbro data.', error);
    }
}
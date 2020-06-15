export const getLocalStorageState = (type: string) =>
    JSON.parse(localStorage.getItem(`${type}_state`));

export const setLocalStorageState = (type: string, newState: object) =>
    localStorage.setItem(`${type}_state`, JSON.stringify(newState));

export const removeLocalStorageState = (type: string) =>
    localStorage.removeItem(`${type}_state`);

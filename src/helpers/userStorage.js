export const getProfileStorage = () => {
    return JSON.parse(localStorage.getItem('profile'));
}

export const setProfileStorage = (profile) => {
    return localStorage.setItem('profile', JSON.stringify(profile));
}
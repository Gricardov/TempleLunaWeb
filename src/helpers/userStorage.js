export const getProfileStorage = () => {
    return JSON.parse(localStorage.getItem('profile'));
}

export const setProfileStorage = (profile) => {
    return localStorage.setItem('profile', JSON.stringify(profile));
}

// Esto guarda los tipos de solicitudes elegidos en la pantalla de admin
export const getAdminRequestType = () => {
    return localStorage.getItem('adminRequestType');
}

export const setAdminRequestType = (reqType) => {
    return localStorage.setItem('adminRequestType', reqType);
}
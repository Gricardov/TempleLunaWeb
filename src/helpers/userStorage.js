export const getProfileStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('profile'));
    } catch (error) {
        return null;
    }
}

export const setProfileStorage = (profile) => {
    return localStorage.setItem('profile', JSON.stringify(profile));
}

// Esto guarda los tipos de solicitudes elegidos en la pantalla de admin
export const getAdminRequestType = (defaultType) => {
    try {
        const type = JSON.parse(localStorage.getItem('adminRequestType'));
        if (Object.keys(type).length == 0) {
            return defaultType;
        }
        return type;
    } catch (error) {
        return defaultType;
    }
}

export const setAdminRequestType = (reqType) => {
    return localStorage.setItem('adminRequestType', JSON.stringify(reqType));
}
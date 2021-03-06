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

// Esto guarda la pestana seleccionada en la pantalla de admin
export const getAdminMainTabIndex = () => {
    return parseInt(localStorage.getItem('adminMainTabIndex')) || 0;

}

export const setAdminMainTabIndex = (index) => {
    return localStorage.setItem('adminMainTabIndex', index);
}

// Temas
export const getTheme = () => {
    try {
        return JSON.parse(localStorage.getItem('theme'));
    } catch (error) {
        return null;
    }
}

export const saveTheme = (theme) => {
    return localStorage.setItem('theme', JSON.stringify(theme));
}
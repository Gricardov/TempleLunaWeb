import { extractLink } from './functions';

export const isNameInvalid = (name, notRequired) => {
    if (!name && !notRequired) {
        return 'El nombre está vacío';
    }
    else if (!(/^(?!\s*$).{1,50}/.test(name))) {
        return 'Tu nombre debe tener de 1 a 50 caracteres';
    }
    else if (!(/^[a-zA-Z\sáéíóúñÑ]*$/.test(name))) {
        return 'Tu nombre no puede tener caracteres especiales';
    }
}

export const isAgeInvalid = (age, notRequired) => {
    if (!age && !notRequired) {
        return 'La edad está vacía';
    }
    else if (age < 10 || age > 99) {
        return 'Introduce una edad válida';
    }
}

export const isPhoneInvalid = (phone, notRequired) => {
    if (!phone && !notRequired) {
        return 'El teléfono está vacío';
    }
    else if (!(/(^\s*$)|(^[+]?[0-9 ]{7,20}$)/).test(phone)) {
        return 'Introduce un teléfono válido';
    }
}

export const isEmailInvalid = (email, notRequired) => {
    if (!email && !notRequired) {
        return 'El correo está vacío';
    }
    else if (!(/^(?!\s*$).{6,100}/.test(email))) {
        return 'Tu correo debe tener de 6 a 100 caracteres';
    }
    else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
        return 'Introduce un correo válido';
    }
}

export const isLinkInvalid = (link, notRequired) => {
    if (!link && !notRequired) {
        return 'El link está vacío';
    }
    else if (!(/^(?!\s*$).{1,500}/.test(link))) {
        return 'Tu link debe tener de 1 a 500 caracteres';
    } else if (!extractLink(link.trim())) {
        return 'Parece que ese link no es válido. Revísalo bien';
    }
}

export const isTitleInvalid = (title, notRequired) => {
    if (!title && !notRequired) {
        return 'El título está vacío';
    }
    else if (!(/^(?!\s*$).{1,100}/.test(title))) {
        return 'Tu título debe tener de 1 a 100 caracteres';
    }
}

export const isAuthorInvalid = (author, notRequired) => {
    if (!author && !notRequired) {
        return 'El autor está vacío';
    } else if (!(/^(?!\s*$).{1,100}/.test(author))) {
        return 'Tu pseudónimo debe tener de 1 a 100 caracteres';
    }
}

export const isIntentionInvalid = (intention, notRequired) => {
    if (!intention && !notRequired) {
        return 'La intención está vacía';
    } else if (!(/^(?!\s*$).{1,1000}/.test(intention))) {
        return 'Lo que quieres transmitir debe tener de 1 a 1000 caracteres';
    }
}

export const isAboutInvalid = (about, notRequired) => {
    if (!about && !notRequired) {
        return 'El resumen de tu historía está vacío';
    } else if (!(/^(?!\s*$).{1,1000}/.test(about))) {
        return 'El resumen de tu historia debe contener de 1 a 1000 caracteres';
    }
}
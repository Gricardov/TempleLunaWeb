import moment from 'moment';
import { designTypes, contactTypes, critiquePoints, contributors } from '../data/data';
import "moment/locale/es";

export const getPointNameFromKey = (key) => {
    return '';
}

export const getDateText = (dateMs) => {
    let dayPortion = '';
    const momentObj = moment(dateMs);
    if (momentObj.isSame(moment(), 'day')) {
        dayPortion = momentObj.format('[Hoy, a las] hh:mma');
    }
    else if (momentObj.isSame(moment().subtract(1, 'days'), 'day')) {
        dayPortion = momentObj.format('[Ayer, a las] hh:mma');
    }
    else {
        dayPortion = momentObj.format('dddd DD/MM/YY hh:mma');
    }
    return toSentence(dayPortion);
}

export const getExpDateText = (expDateMs) => {
    let result = 'Vence en ';
    let totalMinutes = moment(expDateMs).diff(moment(), 'minutes', true);

    if (totalMinutes < 0) {
        result = 'Venció hace ';
        totalMinutes *= -1;
    }

    const totalDays = totalMinutes / 1440;
    const wholeDays = Math.trunc(totalDays);
    const totalHours = (totalDays % 1) * 24;
    const wholeHours = Math.trunc(totalHours);
    const wholeMinutes = Math.trunc((totalHours % 1) * 60);

    if (wholeDays >= 1) {
        result += wholeDays + ` dia${wholeDays > 1 ? 's' : ''}`;
    }

    if (wholeHours >= 1) {
        result += ', ' + wholeHours + ` hora${wholeHours > 1 ? 's' : ''}`;
    }

    if (wholeMinutes >= 1 && wholeDays < 1) {
        result += ', ' + wholeMinutes + ` minuto${wholeMinutes > 1 ? 's' : ''}`;
    }
    return result;
}

export const toSentence = (text, limit) => {
    limit = !limit ? text.length : limit;
    if (text && text.length > 0) {
        return text.substring(0, 1).toUpperCase() + text.substring(1, limit);
    } else {
        return '';
    }
}

export const getMessengerTypeName = (type) => {
    const messengerType = contactTypes.find(c => c.type == type);
    if (messengerType) {
        return messengerType.name;
    }
    return '';
}

export const getDesignType = (type) => {
    const obj = designTypes.find(e => e.type == type);
    if (obj) {
        return obj;
    }
    return {};
}

export const getAbrevPointName = (id) => {
    const obj = critiquePoints.find(e => e.id == id);
    if (obj) {
        return obj.abrev;
    }
    return '';
}

export const getFormattedPhone = (rawPhone) => {
    let result = '';
    if (rawPhone) {
        result = rawPhone.trim().replace(/' '/g, '');
        if (result[0] != '+') {
            result = '+' + result;
        }
        return result;
    }
    return null;
}

export const extractLink = (rawLink) => {
    if (rawLink) {
        const matchedArray = rawLink.match(/(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/g);
        if (matchedArray) {
            return matchedArray[0];
        }
    }
    return '';
}

export const getRandomContributorName = () => {
    const min = Math.ceil(0);
    const max = Math.floor(contributors.length - 1);
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return contributors[number];
}
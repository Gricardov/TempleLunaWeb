import moment from 'moment';
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
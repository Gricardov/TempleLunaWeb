import { faMonument } from '@fortawesome/free-solid-svg-icons';
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

export const getExpDateText = (dateMs, expDays) => {
    const momentObj = moment(dateMs).add(expDays, 'days');
    const totalMinutes = momentObj.diff(moment(), 'minutes', true);
    const totalDays = totalMinutes / 1440;
    const wholeDays = Math.trunc(totalDays);
    const totalHours = (totalDays % 1) * 24;
    const wholeHours = Math.trunc(totalHours);
    const wholeMinutes = Math.trunc((totalHours % 1) * 60);

    console.log(wholeDays + ' ' + wholeHours + ' ' + wholeMinutes)

}

export const toSentence = (text, limit) => {
    limit = !limit ? text.length : limit;
    if (text && text.length > 0) {
        return text.substring(0, 1).toUpperCase() + text.substring(1, limit);
    } else {
        return '';
    }
}
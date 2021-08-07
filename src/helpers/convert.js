import 'intl';
import 'intl/locale-data/jsonp/en.js';
import moment from 'moment';

export const Convert = {
    dateTimeFormat: date => {
        return moment(date).utc(false).format('DD MMM YYYY HH:mm');
    },
    getFormatMoney: amount => {
        const formatter = new Intl.NumberFormat('id-ID');
        return formatter.format(amount);
    },
    getTransactionType: type => {
        switch (type) {
            case 0:
                return 'Setoran';

            case 1:
                return 'Penarikan';

            default:
                return null;
        }
    }
}
import dayjs from 'dayjs';
dayjs.locale('ua');
export const formatDate = (date: Date | undefined): string => {
    if (!date) {
        return '';
    }
    return dayjs(date).format('MMMM D, YYYY');
};

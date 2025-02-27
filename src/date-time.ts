import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { stringUtils } from './string';

dayjs.extend(relativeTime);
dayjs.locale('vi');

function getTimeAgo(startDate: string) {
	try {
		const now = dayjs();
		const start = dayjs(startDate);
		let result = start.from(now);
		result = stringUtils.capitalizeFirstLetter(result);

		return result;
	} catch (_) {
		return '';
	}
}

const formatToVNDateTime = (dateStr: string) => {
	const result = dayjs(dateStr).format('DD/MM/YYYY');
	return result;
};

export const dateTimeUtils = {
	getTimeAgo,
	formatToVNDateTime
};

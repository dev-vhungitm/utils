import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { configs } from '../constants';
import { stringUtils } from './string';

dayjs.extend(relativeTime);
dayjs.locale('vi');

function getTimeAgo({ date }: { date: string }) {
	try {
		const now = dayjs();
		const start = dayjs(date);
		let result = start.from(now);
		result = stringUtils.capitalizeFirstLetter({ string: result });

		return result;
	} catch {
		return '';
	}
}

const formatToVNDateTime = (dateStr: string) => {
	const result = dayjs(dateStr).format(configs.dateFormats.vnDate);
	return result;
};

export const dateTimeUtils = {
	getTimeAgo,
	formatToVNDateTime
};

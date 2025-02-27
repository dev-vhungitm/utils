import 'dayjs/locale/vi';
declare function getTimeAgo(startDate: string): string;
export declare const dateTimeUtils: {
    getTimeAgo: typeof getTimeAgo;
    formatToVNDateTime: (dateStr: string) => string;
};
export {};

import 'dayjs/locale/vi';
declare function getTimeAgo({ date }: {
    date: string;
}): string;
export declare const dateTimeUtils: {
    getTimeAgo: typeof getTimeAgo;
    toVNDateTime: ({ dateString }: {
        dateString: string;
    }) => string;
};
export {};

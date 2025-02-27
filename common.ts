import dayjs from 'dayjs';

export type TSortParam = string | number | Date | boolean | undefined | null;

const sortString = (a: string, b: string) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
};

const sortNumber = (a: number, b: number) => {
    return a - b;
};

const sortDateString = (a: string, b: string) => {
    const dateA = dayjs(a, 'DD/MM/YYYY');
    const dateB = dayjs(b, 'DD/MM/YYYY');

    return dateA.isAfter(dateB) ? 1 : dateA.isBefore(dateB) ? -1 : 0;
};

const sortBoolean = (a: boolean, b: boolean) => {
    return sortString(a.toString(), b.toString());
};

const sort = (
    a: TSortParam = null,
    b: TSortParam = null,
    type: 'string' | 'number' | 'dateString' | 'boolean' = 'string'
) => {
    if (a === null && b === null) return 0;
    if (a === null) return 1;
    if (b === null) return -1;

    switch (type) {
        case 'string':
            return sortString(a as string, b as string);
        case 'number':
            return sortNumber(a as number, b as number);
        case 'dateString':
            return sortDateString(a as string, b as string);
        case 'boolean':
            return sortBoolean(a as boolean, b as boolean);
        default:
            return sortString(a as string, b as string);
    }
};

export const commonUtils = {
    sort
};

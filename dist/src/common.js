"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonUtils = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const sortString = (a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
};
const sortNumber = (a, b) => {
    return a - b;
};
const sortDateString = (a, b) => {
    const dateA = (0, dayjs_1.default)(a, 'DD/MM/YYYY');
    const dateB = (0, dayjs_1.default)(b, 'DD/MM/YYYY');
    return dateA.isAfter(dateB) ? 1 : dateA.isBefore(dateB) ? -1 : 0;
};
const sortBoolean = (a, b) => {
    return sortString(a.toString(), b.toString());
};
const sort = (a = null, b = null, type = 'string') => {
    if (a === null && b === null)
        return 0;
    if (a === null)
        return 1;
    if (b === null)
        return -1;
    switch (type) {
        case 'string':
            return sortString(a, b);
        case 'number':
            return sortNumber(a, b);
        case 'dateString':
            return sortDateString(a, b);
        case 'boolean':
            return sortBoolean(a, b);
        default:
            return sortString(a, b);
    }
};
exports.commonUtils = {
    sort
};

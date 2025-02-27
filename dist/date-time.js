"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTimeUtils = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/vi");
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
const string_1 = require("./string");
dayjs_1.default.extend(relativeTime_1.default);
dayjs_1.default.locale('vi');
function getTimeAgo(startDate) {
    try {
        const now = (0, dayjs_1.default)();
        const start = (0, dayjs_1.default)(startDate);
        let result = start.from(now);
        result = string_1.stringUtils.capitalizeFirstLetter(result);
        return result;
    }
    catch (_) {
        return '';
    }
}
const formatToVNDateTime = (dateStr) => {
    const result = (0, dayjs_1.default)(dateStr).format('DD/MM/YYYY');
    return result;
};
exports.dateTimeUtils = {
    getTimeAgo,
    formatToVNDateTime
};

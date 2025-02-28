"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTimeUtils = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/vi");
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
const constants_1 = require("../constants");
const string_1 = require("./string");
dayjs_1.default.extend(relativeTime_1.default);
dayjs_1.default.locale('vi');
function getTimeAgo({ date }) {
    try {
        const now = (0, dayjs_1.default)();
        const start = (0, dayjs_1.default)(date);
        let result = start.from(now);
        result = string_1.stringUtils.capitalizeFirstLetter({ string: result });
        return result;
    }
    catch {
        return '';
    }
}
const formatToVNDateTime = (dateStr) => {
    const result = (0, dayjs_1.default)(dateStr).format(constants_1.configs.dateFormats.vnDate);
    return result;
};
exports.dateTimeUtils = {
    getTimeAgo,
    formatToVNDateTime
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataUtils = void 0;
const getDataByPage = ({ data = [], page = 1, itemsPerPage = 8 }) => {
    const startId = (page - 1) * itemsPerPage;
    const endId = startId + itemsPerPage;
    const result = data.slice(startId, endId);
    return result;
};
const formDataToObject = ({ formData }) => {
    const result = {};
    Object.keys(formData).map(key => {
        let value = formData[key];
        if (value === 'true')
            value = true;
        if (value === 'false')
            value = false;
        if (value === 'null')
            value = null;
        result[key] = value;
    });
    return result;
};
exports.dataUtils = {
    getDataByPage,
    formDataToObject
};

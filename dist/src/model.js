"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelUtils = void 0;
exports.modelUtils = {
    arrayToJSON: (modelList) => {
        const result = [];
        modelList.forEach(model => result.push(model.toJSON()));
        return result;
    }
};

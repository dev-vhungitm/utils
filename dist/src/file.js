"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUtils = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const processFilePath = (filePath = '') => {
    return filePath.replace(/\\/g, '/');
};
const removeFile = (root, filePath = '') => {
    try {
        const fileFullPath = path_1.default.join(root, filePath);
        fs_1.default.unlinkSync(fileFullPath);
    }
    catch (_) { }
};
const checkAndCreateDirectory = (root, dirPath = '') => {
    const fullPath = path_1.default.join(root + dirPath);
    if (!fs_1.default.existsSync(fullPath)) {
        fs_1.default.mkdirSync(fullPath, { recursive: true });
    }
};
exports.fileUtils = {
    processFilePath,
    removeFile,
    checkAndCreateDirectory
};

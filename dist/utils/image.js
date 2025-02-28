"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUtils = exports.getDimensions = void 0;
const constants_1 = require("../constants");
const toBase64 = async ({ image }) => {
    try {
        const result = new Promise((resolve, reject) => {
            if (!image || !constants_1.configs.imageValidTypesPattern.test(image.type)) {
                resolve(null);
                return;
            }
            const reader = new FileReader();
            reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
            reader.onerror = () => reject(null);
            reader.readAsDataURL(image);
        });
        return await result;
    }
    catch {
        return null;
    }
};
const generateURL = ({ url = '', root = '' }) => {
    try {
        const result = `${!url.startsWith('http') ? `${root}/` : ''}${url}?t=${new Date().getTime()}`;
        return result;
    }
    catch {
        return url;
    }
};
const convertType = async ({ image, type = constants_1.enums.imageTypes.webp.type, extension = constants_1.enums.imageTypes.webp.extension }) => {
    try {
        if (!image)
            return null;
        const originalFileName = image.name.replace(/\.[^/.]+$/, '');
        const img = new Image();
        const reader = new FileReader();
        return await new Promise((resolve, reject) => {
            reader.onload = () => {
                img.src = reader.result;
            };
            img.onload = async () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);
                canvas.toBlob(blob => {
                    if (blob) {
                        const resultFile = new File([blob], `${originalFileName}.${extension}`, { type });
                        resolve(resultFile);
                    }
                    else
                        reject(null);
                }, type);
            };
            img.onerror = () => reject(null);
            reader.onerror = () => reject(null);
            reader.readAsDataURL(image);
        });
    }
    catch {
        return null;
    }
};
const toWebP = async ({ image }) => {
    const result = await convertType({ image });
    return result;
};
const toWebPBase64 = async ({ image }) => {
    try {
        if (!image)
            return null;
        const webP = await toWebP({ image });
        const result = await toBase64({ image: webP });
        return result;
    }
    catch {
        return null;
    }
};
const getDimensions = ({ image }) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(image);
        img.onload = () => {
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight
            });
            URL.revokeObjectURL(url);
        };
        img.onerror = () => reject(null);
        img.src = url;
    });
};
exports.getDimensions = getDimensions;
const isValidURL = ({ url = '' }) => {
    return new Promise(resolve => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
};
exports.imageUtils = {
    generateURL,
    convertType,
    toBase64,
    toWebP,
    toWebPBase64,
    getDimensions: exports.getDimensions,
    isValidURL
};

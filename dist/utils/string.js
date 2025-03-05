"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtils = void 0;
const constants_1 = require("../constants");
const image_1 = require("./image");
const capitalizeFirstLetter = ({ string = '' }) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const getValidClassNames = ({ classNames }) => {
    return classNames.filter(className => className).join(' ');
};
const removeVNTones = ({ string = '' }) => {
    return string
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};
const removeTags = ({ string = '' }) => {
    return string.toString().replace(/(<([^>]+)>)/gi, '');
};
const generateSlug = ({ string = '', prefix }) => {
    const result = (prefix ?? '/') +
        removeVNTones({ string })
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    return result;
};
const base64ToFile = ({ base64, fileName = 'file' }) => {
    const mimeTypeMatch = base64.match(/data:(.*?);base64,/);
    if (!mimeTypeMatch)
        return null;
    const mimeType = mimeTypeMatch[1];
    const base64Data = base64.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    let extension = '';
    Object.keys(constants_1.enums.imageTypes).find(key => {
        const value = constants_1.enums.imageTypes[key];
        if (value.type === mimeType)
            extension = value.extension;
    });
    const file = new File([byteArray], `${fileName}.${extension}`, { type: mimeType });
    return file;
};
const getListBase64 = ({ string = '' }) => {
    const base64Regex = /data:(.*?);base64,([A-Za-z0-9+/=]+)/g;
    const matches = [];
    let match;
    while ((match = base64Regex.exec(string)) !== null) {
        matches.push(match[0]);
    }
    return matches;
};
const listBase64ToListFile = ({ listBase64 = [] }) => {
    const result = [];
    for (const base64 of listBase64) {
        const file = base64ToFile({ base64 });
        if (file)
            result.push(file);
    }
    return result;
};
const replaceBase64ByWebPBase64 = async ({ string = '' }) => {
    string ||= '';
    let listBase64 = getListBase64({ string });
    listBase64 = [...new Set(listBase64)];
    const promises = listBase64.map(async (base64) => {
        const image = base64ToFile({ base64 });
        const webPBase64 = await image_1.imageUtils.toWebPBase64({ image: image });
        string = string.replaceAll(base64, webPBase64);
    });
    await Promise.all(promises);
    return string;
};
const downloadBase64File = ({ base64 = '', fileName = 'file' }) => {
    const match = base64.match(/^data:(.+);base64,/);
    if (!match)
        return;
    const mimeType = match[1];
    const extension = mimeType.split('/')[1];
    fileName = `${fileName.replace(/\.[^/.]+$/, '')}.${extension}`;
    const link = document.createElement('a');
    link.href = base64;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const replaceImageUrlInContent = ({ contentImages = [], content = '' }) => {
    if (contentImages.length > 0) {
        contentImages.forEach((contentImage, contentImageId) => {
            content = content.replace(`{{{img${contentImageId}}}}`, contentImage);
        });
    }
    return content;
};
const addBaseUrlForImageSrc = ({ content = '', baseUrl = '' }) => {
    // Regular expression to find <img> tags and capture their src attribute.
    const regex = /<img\s+[^>]*src=(["'])(.*?)\1[^>]*>/g;
    // Replace each <img> tag in the content.
    return content.replace(regex, (match, quote, src) => {
        // Check if the src is an external link (starts with http or https).
        const isExternalLink = /^(http|https):\/\//.test(src);
        // If src is not an external link, prepend the baseUrl.
        if (!isExternalLink) {
            return match.replace(src, `${baseUrl}${src}`);
        }
        // If it's an external link, return the original match without changes.
        return match;
    });
};
const removeBaseUrlForImageSrc = ({ content = '', baseUrl = '' }) => {
    const regex = new RegExp(`(<img\\s+[^>]*src=["'])(${baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/[^"']+)(["'][^>]*>)`, 'g');
    return content.replace(regex, (_, p1, p2, p3) => {
        const relativePath = p2.replace(`${baseUrl}`, '');
        return `${p1}${relativePath}${p3}`;
    });
};
exports.stringUtils = {
    removeTags,
    capitalizeFirstLetter,
    generateSlug,
    getListBase64,
    base64ToFile,
    downloadBase64File,
    listBase64ToListFile,
    replaceBase64ByWebPBase64,
    getValidClassNames,
    replaceImageUrlInContent,
    addBaseUrlForImageSrc,
    removeBaseUrlForImageSrc
};

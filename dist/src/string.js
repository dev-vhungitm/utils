"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtils = void 0;
const image_1 = require("./image");
const capitalizeFirstLetter = (str = '') => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const getValidClassNames = (classNames) => {
    return classNames.filter(className => className).join(' ');
};
const removeVNTones = (str) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};
function removeTags(str = '') {
    if (str === null || str === '')
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
}
const generateSlug = (str = '', prefix = '') => {
    const result = prefix +
        removeVNTones(str)
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    return result;
};
const base64ToFile = (base64String, fileName = 'file') => {
    // Extract the MIME type from the Base64 string
    const mimeTypeMatch = base64String.match(/data:(.*?);base64,/);
    if (!mimeTypeMatch) {
        return null;
    }
    const mimeType = mimeTypeMatch[1];
    // Split the Base64 data from the prefix
    const base64Data = base64String.split(',')[1];
    // Convert Base64 to a byte array
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    // Determine file extension based on MIME type
    let extension = '';
    if (mimeType) {
        switch (mimeType) {
            case 'image/jpeg':
                extension = '.jpg';
                break;
            case 'image/png':
                extension = '.png';
                break;
            case 'image/gif':
                extension = '.gif';
                break;
            // Add other MIME types and their extensions as needed
            default:
                extension = ''; // Leave empty for unknown types
                break;
        }
    }
    // Create a File object from the byte array with the proper file name and extension
    const file = new File([byteArray], `${fileName}${extension}`, { type: mimeType });
    return file;
};
const getListBase64 = (input) => {
    // Regular expression to match the Base64 data in the src attribute
    const base64Regex = /data:(.*?);base64,([A-Za-z0-9+/=]+)/g;
    const matches = [];
    let match;
    // Find all matches of Base64 data in the input string
    while ((match = base64Regex.exec(input)) !== null) {
        // Push the full Base64 data (with the prefix) into the array
        matches.push(match[0]);
    }
    return matches;
};
const listBase64ToListFile = (listBase64) => {
    const result = [];
    for (const base64 of listBase64) {
        const file = base64ToFile(base64);
        if (file)
            result.push(file);
    }
    return result;
};
const replaceBase64ByWebPBase64 = async (content = '') => {
    content ||= '';
    let listBase64 = getListBase64(content);
    listBase64 = [...new Set(listBase64)]; // Remove duplicate value
    const promises = listBase64.map(async (base64) => {
        const image = base64ToFile(base64); // Convert base64 to image
        const webPBase64 = await image_1.imageUtils.convertImageToWebPBase64(image); // Convert image to base64 of webP
        content = content.replaceAll(base64, webPBase64); // Replace old base64 by base64 of webP
    });
    // Wait for all promises to resolve concurrently
    await Promise.all(promises);
    return content;
};
const downloadBase64File = (base64, fileName = 'image') => {
    const match = base64.match(/^data:(.+);base64,/);
    if (!match) {
        console.log('Base64 không hợp lệ.');
        return;
    }
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
exports.stringUtils = {
    removeTags,
    capitalizeFirstLetter,
    generateSlug,
    getListBase64,
    base64ToFile,
    downloadBase64File,
    listBase64ToListFile,
    replaceBase64ByWebPBase64,
    getValidClassNames
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUtils = void 0;
const upload = async (cloudinary, buffer, folder = '') => {
    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream.end(buffer);
    });
    return result;
};
const remove = async (cloudinary, path) => {
    if (path) {
        const publicId = extractPublicId(path);
        if (publicId)
            await cloudinary.uploader.destroy(publicId);
    }
};
const extractPublicId = (url = '') => {
    const regex = /\/upload\/v\d+\/(.*?)(?:\.\w+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
exports.cloudinaryUtils = {
    upload,
    extractPublicId,
    remove
};

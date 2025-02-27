const upload = async (cloudinary: any, buffer: Buffer, folder: string = '') => {
    const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result);
        });
        stream.end(buffer);
    });

    return result;
};

const remove = async (cloudinary: any, path: string | null | undefined) => {
    if (path) {
        const publicId = extractPublicId(path);
        if (publicId) await cloudinary.uploader.destroy(publicId);
    }
};

const extractPublicId = (url: string = '') => {
    const regex = /\/upload\/v\d+\/(.*?)(?:\.\w+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const cloudinaryUtils = {
    upload,
    extractPublicId,
    remove
};

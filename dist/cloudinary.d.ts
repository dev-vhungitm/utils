export declare const cloudinaryUtils: {
    upload: (cloudinary: any, buffer: Buffer, folder?: string) => Promise<any>;
    extractPublicId: (url?: string) => string | null;
    remove: (cloudinary: any, path: string | null | undefined) => Promise<void>;
};

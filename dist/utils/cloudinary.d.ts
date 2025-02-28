export declare const cloudinaryUtils: {
    upload: ({ cloudinary, buffer, folder }: {
        cloudinary: any;
        buffer: Buffer;
        folder: string;
    }) => Promise<any>;
    extractPublicId: ({ url }: {
        url: string;
    }) => string | null;
    remove: ({ cloudinary, path }: {
        cloudinary: any;
        path: string | null | undefined;
    }) => Promise<void>;
};

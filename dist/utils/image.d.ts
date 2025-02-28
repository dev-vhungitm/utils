export declare const getDimensions: ({ image }: {
    image: File;
}) => Promise<{
    width: number;
    height: number;
}>;
export declare const imageUtils: {
    generateURL: ({ url, root }: {
        url: string;
        root?: string;
    }) => string;
    convertType: ({ image, type, extension }: {
        image: File;
        type?: string;
        extension?: string;
    }) => Promise<File | null>;
    toBase64: ({ image }: {
        image: File;
    }) => Promise<string | null>;
    toWebP: ({ image }: {
        image: File;
    }) => Promise<File | null>;
    toWebPBase64: ({ image }: {
        image: File;
    }) => Promise<string | null>;
    getDimensions: ({ image }: {
        image: File;
    }) => Promise<{
        width: number;
        height: number;
    }>;
    isValidURL: ({ url }: {
        url: string;
    }) => Promise<boolean>;
};

export declare const stringUtils: {
    removeTags: ({ string }: {
        string: string;
    }) => string;
    capitalizeFirstLetter: ({ string }: {
        string: string;
    }) => string;
    generateSlug: ({ string, prefix }: {
        string: string;
        prefix?: string | null;
    }) => string;
    getListBase64: ({ string }: {
        string: string;
    }) => string[];
    base64ToFile: ({ base64, fileName }: {
        base64: string;
        fileName?: string;
    }) => File | null;
    downloadBase64File: ({ base64, fileName }: {
        base64: string;
        fileName?: string;
    }) => void;
    listBase64ToListFile: ({ listBase64 }: {
        listBase64: string[];
    }) => File[];
    replaceBase64ByWebPBase64: ({ string }: {
        string: string;
    }) => Promise<string>;
    getValidClassNames: ({ classNames }: {
        classNames: (string | any)[];
    }) => string;
};

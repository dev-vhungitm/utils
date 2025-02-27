declare function removeTags(str?: string): string | false;
export declare const stringUtils: {
    removeTags: typeof removeTags;
    capitalizeFirstLetter: (str?: string) => string;
    generateSlug: (str?: string, prefix?: string) => string;
    getListBase64: (input: string) => string[];
    base64ToFile: (base64String: string, fileName?: string) => File | null;
    downloadBase64File: (base64: string, fileName?: string) => void;
    listBase64ToListFile: (listBase64: string[]) => File[];
    replaceBase64ByWebPBase64: (content?: string) => Promise<string>;
    getValidClassNames: (classNames: (string | any)[]) => string;
};
export {};

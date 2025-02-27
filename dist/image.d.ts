/**
 * getImageDimensions
 * This function retrieves the intrinsic width and height of an image file.
 * It creates an HTML image element, loads the image from a temporary URL,
 * and returns a promise that resolves with the image dimensions.
 *
 * @param {File} file - The image file to get dimensions from.
 * @returns {Promise<{ width: number; height: number }>} - A promise that resolves with the image's width and height.
 */
export declare const getImageDimensions: (file: File) => Promise<{
    width: number;
    height: number;
}>;
export declare const imageUtils: {
    imageToBase64: (file: File) => Promise<unknown>;
    generateImageURL: (imageURL?: string) => string;
    convertImage: (file: File, format?: string) => Promise<File | null>;
    convertToWebP: (file: File) => Promise<File | null>;
    convertImageToWebPBase64: (image: File) => Promise<unknown>;
    getImageDimensions: (file: File) => Promise<{
        width: number;
        height: number;
    }>;
    isValidImageUrl: (url: string) => Promise<boolean>;
};

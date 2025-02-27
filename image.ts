/**
 * Function to convert an image file to a Base64 string.
 * @param {File} file - The image file to be converted.
 * @returns {Promise<string | null | undefined>} A Promise that resolves to the Base64 string, null if invalid image, or undefined if an error occurs.
 */
const imageToBase64 = async (file: File) => {
    try {
        // Return a promise that handles the file conversion
        const result = new Promise((resolve, reject) => {
            // Check if the file is valid and matches a supported image type (WebP, JPEG, PNG, SVG)
            if (!file || !file.type.match("image/webp,image/jpeg,image/png,image/svg+xml,image/gif,image/bmp,image/tiff")) {
                resolve(null); // Resolve with null if the file is not an image or unsupported type
                return;
            }

            // Create a FileReader to read the image file
            const reader = new FileReader();

            // Define the onload event for the reader
            reader.onload = function () {
                if (typeof reader.result === 'string') {
                    // If reader.result is a string (Base64 Data URL), resolve with the Base64 value
                    const base64 = reader.result;
                    resolve(base64);
                } else {
                    resolve(null); // Resolve with null if the result is not a valid string
                }
            };

            // Handle any errors that occur during file reading
            reader.onerror = () => {
                reject(null); // Reject the promise with the error if it occurs
            };

            // Start reading the file as a Data URL (Base64 encoding)
            reader.readAsDataURL(file);
        });

        // Await the result of the promise and return it
        return await result;
    } catch {
        // Return undefined if there is an unexpected error during the process
        return null;
    }
};

/**
 * Function to generate a unique URL for an image by adding a timestamp.
 * @param {string} imageURL - The URL of the image.
 * @returns {string} The modified URL with a timestamp to prevent caching.
 */
const generateImageURL = (imageURL = '') => {
    try {
        // Add a timestamp query parameter to the image URL to avoid caching
        const result = `${imageURL}?t=${new Date().getTime()}`;
        return result; // Return the modified URL with a timestamp
    } catch {
        // If there is an error, return the original image URL
        return imageURL;
    }
};

/**
 * Function to convert an image file to WebP format.
 * @param {File} file - The input image file.
 * @returns {Promise<string>} A Data URL string of the image in WebP format.
 */
const convertImage = async (file: File, format: string = 'webp'): Promise<File | null> => {
    try {
        if (!file) return null;

        // Get the original file name without the extension
        const originalFileName = file.name.replace(/\.[^/.]+$/, ''); // Remove the extension from the original file name

        // Create an image object
        const img = new Image();
        const reader = new FileReader();

        return await new Promise((resolve, reject) => {
            // Read the file as a Data URL
            reader.onload = () => {
                img.src = reader.result as string; // Set the image source to the Data URL
            };

            // Handle image load event
            img.onload = async () => {
                // Create a canvas element
                const canvas = document.createElement('canvas');
                canvas.width = img.width; // Set canvas width equal to the image width
                canvas.height = img.height; // Set canvas height equal to the image height

                // Get the 2D rendering context of the canvas
                const ctx = canvas.getContext('2d');
                // Draw the image onto the canvas
                ctx?.drawImage(img, 0, 0);

                // Convert the canvas content to a Blob in format
                canvas.toBlob(blob => {
                    if (blob) {
                        // Create a new File object from the Blob with the original file name but with format extension
                        const resultFile = new File([blob], `${originalFileName}.${format}`, { type: `image/${format}` });
                        resolve(resultFile); // Resolve the promise with the WebP file
                    } else {
                        reject(null); // Reject if blob creation failed
                    }
                }, `image/${format}`);
            };

            // Handle errors during image loading
            img.onerror = () => reject(null); // Error loading the image
            reader.onerror = () => reject(null); // Error reading the file

            // Start reading the file
            reader.readAsDataURL(file);
        });
    } catch {
        return null; // Fail
    }
};

/**
 * Function to convert an image file to WebP format.
 * @param {File} file - The input image file.
 * @returns {Promise<string>} A Data URL string of the image in WebP format.
 */
const convertToWebP = async (file: File): Promise<File | null> => {
    const result = await convertImage(file, 'webp');
    return result;
};

/**
 * Converts an image to WebP format and then to a Base64 string.
 * @param {File} image - The input image (can be a file or URL).
 * @returns {Promise<string | null>} A promise that resolves to the Base64 string of the WebP image, or null if an error occurs.
 */
const convertImageToWebPBase64 = async (image: File) => {
    try {
        // If no image is provided, return null
        if (!image) return null;

        // Convert the image to WebP format
        const webP = await convertToWebP(image);

        // Convert the WebP image to a Base64 string
        const result = await imageToBase64(webP as File);

        // Return the Base64 result
        return result;
    } catch {
        // Return null in case of any errors during conversion
        return null;
    }
};

/**
 * getImageDimensions
 * This function retrieves the intrinsic width and height of an image file.
 * It creates an HTML image element, loads the image from a temporary URL,
 * and returns a promise that resolves with the image dimensions.
 *
 * @param {File} file - The image file to get dimensions from.
 * @returns {Promise<{ width: number; height: number }>} - A promise that resolves with the image's width and height.
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image(); // Create a new image object to retrieve its dimensions
        const url = URL.createObjectURL(file); // Generate a temporary URL for the provided file

        // Handle successful image load
        img.onload = () => {
            resolve({
                width: img.naturalWidth, // Get the intrinsic (natural) width of the image
                height: img.naturalHeight // Get the intrinsic (natural) height of the image
            });
            URL.revokeObjectURL(url); // Release the object URL to free up memory
        };

        // Handle image loading errors
        img.onerror = () => reject(null);

        // Set the image source to the generated URL to trigger loading
        img.src = url;
    });
};

const isValidImageUrl = (url: string): Promise<boolean> =>
    new Promise(resolve => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });

export const imageUtils = {
    imageToBase64,
    generateImageURL,
    convertImage,
    convertToWebP,
    convertImageToWebPBase64,
    getImageDimensions,
    isValidImageUrl
};

import { imageUtils } from './image';

const capitalizeFirstLetter = (str: string = '') => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const getValidClassNames = (classNames: (string | any)[]) => {
	return classNames.filter(className => className).join(' ');
};

const removeVNTones = (str: string) => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D');
};

function removeTags(str: string = '') {
	if (str === null || str === '') return false;
	else str = str.toString();

	return str.replace(/(<([^>]+)>)/gi, '');
}

const generateSlug = (str: string = '', prefix: string = '') => {
	const result =
		prefix +
		removeVNTones(str)
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');

	return result;
};

const base64ToFile = (base64String: string, fileName: string = 'file'): File | null => {
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

const getListBase64 = (input: string): string[] => {
	// Regular expression to match the Base64 data in the src attribute
	const base64Regex = /data:(.*?);base64,([A-Za-z0-9+/=]+)/g;
	const matches: string[] = [];
	let match;

	// Find all matches of Base64 data in the input string
	while ((match = base64Regex.exec(input)) !== null) {
		// Push the full Base64 data (with the prefix) into the array
		matches.push(match[0]);
	}

	return matches;
};

const listBase64ToListFile = (listBase64: string[]) => {
	const result: File[] = [];

	for (const base64 of listBase64) {
		const file = base64ToFile(base64);
		if (file) result.push(file);
	}

	return result;
};

const replaceBase64ByWebPBase64 = async (content: string = '') => {
	content ||= '';
	let listBase64 = getListBase64(content);
	listBase64 = [...new Set(listBase64)]; // Remove duplicate value

	const promises = listBase64.map(async base64 => {
		const image = base64ToFile(base64); // Convert base64 to image
		const webPBase64 = await imageUtils.convertImageToWebPBase64(image as File); // Convert image to base64 of webP
		content = content.replaceAll(base64, webPBase64 as string); // Replace old base64 by base64 of webP
	});

	// Wait for all promises to resolve concurrently
	await Promise.all(promises);
	return content;
};

const downloadBase64File = (base64: string, fileName: string = 'image') => {
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

export const stringUtils = {
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

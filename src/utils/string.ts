import { enums } from '../constants';
import { imageUtils } from './image';

const capitalizeFirstLetter = ({ string = '' }: { string: string }) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const getValidClassNames = ({ classNames }: { classNames: (string | any)[] }) => {
	return classNames.filter(className => className).join(' ');
};

const removeVNTones = ({ string = '' }: { string: string }) => {
	return string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D');
};

const removeTags = ({ string = '' }: { string: string }) => {
	return string.toString().replace(/(<([^>]+)>)/gi, '');
};

const generateSlug = ({ string = '', prefix }: { string: string; prefix?: string | null }) => {
	const result =
		(prefix ?? '/') +
		removeVNTones({ string })
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');

	return result;
};

const base64ToFile = ({ base64, fileName = 'file' }: { base64: string; fileName?: string }): File | null => {
	const mimeTypeMatch = base64.match(/data:(.*?);base64,/);
	if (!mimeTypeMatch) return null;

	const mimeType = mimeTypeMatch[1];
	const base64Data = base64.split(',')[1];
	const byteCharacters = atob(base64Data);
	const byteNumbers = new Array(byteCharacters.length);

	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}

	const byteArray = new Uint8Array(byteNumbers);
	let extension = '';

	Object.keys(enums.imageTypes).find(key => {
		const value = (enums.imageTypes as any)[key];
		if (value.type === mimeType) extension = value.extension;
	});

	const file = new File([byteArray], `${fileName}.${extension}`, { type: mimeType });

	return file;
};

const getListBase64 = ({ string = '' }: { string: string }): string[] => {
	const base64Regex = /data:(.*?);base64,([A-Za-z0-9+/=]+)/g;
	const matches: string[] = [];
	let match;

	while ((match = base64Regex.exec(string)) !== null) {
		matches.push(match[0]);
	}

	return matches;
};

const listBase64ToListFile = ({ listBase64 = [] }: { listBase64: string[] }) => {
	const result: File[] = [];

	for (const base64 of listBase64) {
		const file = base64ToFile({ base64 });
		if (file) result.push(file);
	}

	return result;
};

const replaceBase64ByWebPBase64 = async ({ string = '' }: { string: string }) => {
	string ||= '';
	let listBase64 = getListBase64({ string });
	listBase64 = [...new Set(listBase64)];

	const promises = listBase64.map(async base64 => {
		const image = base64ToFile({ base64 });
		const webPBase64 = await imageUtils.toWebPBase64({ image: image as File });
		string = string.replaceAll(base64, webPBase64 as string);
	});

	await Promise.all(promises);
	return string;
};

const downloadBase64File = ({ base64 = '', fileName = 'file' }: { base64: string; fileName?: string }) => {
	const match = base64.match(/^data:(.+);base64,/);
	if (!match) return;

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

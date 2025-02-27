import fs from 'fs';
import path from 'path';

const processFilePath = (filePath: string = ''): string => {
	return filePath.replace(/\\/g, '/');
};

const removeFile = (root: string, filePath: string = '') => {
	try {
		const fileFullPath = path.join(root, filePath);
		fs.unlinkSync(fileFullPath);
	} catch (_) {}
};

const checkAndCreateDirectory = (root: string, dirPath = '') => {
	const fullPath = path.join(root + dirPath);
	if (!fs.existsSync(fullPath)) {
		fs.mkdirSync(fullPath, { recursive: true });
	}
};

export const fileUtils = {
	processFilePath,
	removeFile,
	checkAndCreateDirectory
};

const toBase64 = async (file: File) => {
	try {
		const result = new Promise((resolve, reject) => {
			if (!file || !file.type.match('image/webp,image/jpeg,image/png,image/svg+xml,image/gif,image/bmp,image/tiff')) {
				resolve(null);
				return;
			}

			const reader = new FileReader();
			reader.onload = function () {
				if (typeof reader.result === 'string') {
					const base64 = reader.result;
					resolve(base64);
				} else resolve(null);
			};

			reader.onerror = () => reject(null);
			reader.readAsDataURL(file);
		});

		return await result;
	} catch {
		return null;
	}
};

const generateURL = (imageURL = '') => {
	try {
		const result = `${imageURL}?t=${new Date().getTime()}`;
		return result;
	} catch {
		return imageURL;
	}
};

const convertType = async (file: File, format: string = 'webp'): Promise<File | null> => {
	try {
		if (!file) return null;

		const originalFileName = file.name.replace(/\.[^/.]+$/, '');
		const img = new Image();
		const reader = new FileReader();

		return await new Promise((resolve, reject) => {
			reader.onload = () => {
				img.src = reader.result as string;
			};

			img.onload = async () => {
				const canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext('2d');
				ctx?.drawImage(img, 0, 0);

				canvas.toBlob(blob => {
					if (blob) {
						const resultFile = new File([blob], `${originalFileName}.${format}`, { type: `image/${format}` });
						resolve(resultFile);
					} else reject(null);
				}, `image/${format}`);
			};

			img.onerror = () => reject(null);
			reader.onerror = () => reject(null);
			reader.readAsDataURL(file);
		});
	} catch {
		return null;
	}
};

const toWebP = async (file: File): Promise<File | null> => {
	const result = await convertType(file, 'webp');
	return result;
};

const toWebPBase64 = async (image: File) => {
	try {
		if (!image) return null;

		const webP = await toWebP(image);
		const result = await toBase64(webP as File);

		return result;
	} catch {
		return null;
	}
};

export const getDimensions = (file: File): Promise<{ width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(file);

		img.onload = () => {
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight
			});
			URL.revokeObjectURL(url);
		};

		img.onerror = () => reject(null);
		img.src = url;
	});
};

const isValidURL = (url: string): Promise<boolean> => {
	return new Promise(resolve => {
		const img = new Image();
		img.src = url;
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
	});
};

export const imageUtils = {
	generateURL,
	convertType,
	toBase64,
	toWebP,
	toWebPBase64,
	getDimensions,
	isValidURL
};

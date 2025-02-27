export const modelUtils = {
	arrayToJSON: (modelList: any[]) => {
		const result: any[] = [];
		modelList.forEach(model => result.push(model.toJSON()));

		return result;
	}
};

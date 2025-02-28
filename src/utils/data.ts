const getDataByPage = ({
	data = [],
	page = 1,
	itemsPerPage = 8
}: {
	data: any[];
	page: number;
	itemsPerPage: number;
}) => {
	const startId = (page - 1) * itemsPerPage;
	const endId = startId + itemsPerPage;
	const result = data.slice(startId, endId);

	return result;
};

export const dataUtils = {
	getDataByPage
};

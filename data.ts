const getDataByPage = (data: any[] = [], page: number = 1, itemsPerPage = 8) => {
    const startId = (page - 1) * itemsPerPage;
    const endId = startId + itemsPerPage;
    const result = data.slice(startId, endId);

    return result;
};

export const dataUtils = {
    getDataByPage
};

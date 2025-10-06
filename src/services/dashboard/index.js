import base from "../../libs/axios";

export const getChartData = (params = {}) => {
  const {
    propertyType = 'ALL',
  } = params;

  return base.get(`/dashboard/get-data?propertyType=${propertyType}`).then(({ data }) => data).catch((err) => {
    console.error("Error getting chart data:", err?.response?.data?.message || err?.message)
    throw err;
  });
}
  
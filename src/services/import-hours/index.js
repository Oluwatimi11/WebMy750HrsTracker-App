import base from "../../libs/axios";

  export const createImportHours = (data) => 
  base.post(`/activity-logs/import`, data).then(({ data }) => data).catch((err) => {
    console.error("Error importing hours:", err?.response?.data?.message || err?.message)
    throw err;
  });




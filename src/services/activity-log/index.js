import base from "../../libs/axios";

export const getActivityLogs = (params = {}) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    propertyType = 'ALL',
    WithDocuments,
    AllSupportingDocument,
    HasSupportingDocument,
    StartDate,
    EndDate,
  } = params;

  let queryString = `/activity-logs?PageNumber=${pageNumber}&PageSize=${pageSize}&propertyType=${propertyType}`;

  if (WithDocuments !== undefined) {
    queryString += `&WithDocuments=${true}`;
  }

  if (AllSupportingDocument !== undefined) {
    queryString += `&AllSupportingDocument=${true}`;
  }

  if (HasSupportingDocument !== undefined) {
    queryString += `&HasSupportingDocument=${true}`;
  }

  if (StartDate !== undefined) {
    queryString += `&StartDate=${StartDate}`;
  }

  if (EndDate !== undefined) {
    queryString += `&EndDate=${EndDate}`;
  }

  return base.get(queryString)
    .then(({ data }) => data)
    .catch((err) => {
      console.error("Error fetching logs:", err?.response?.data?.message || err?.message);
      throw err;
    });
};

export const getSomeActivityLogs = (keyword) =>
  base.get(`/activity-logs/search?keyword=${keyword}`).then(({ data }) => data).catch((err) => {
    console.error("Error fetching logs:", err?.response?.data?.message || err?.message);
    throw err;
  });

export const getLogCategories = () => {

  return base.get(`/log-categories/list`).then(({ data }) => data?.data).catch((err) => {
    console.error("Error retrieving log categories:", err?.response?.data?.message || err?.message);
    throw err;
  });
}

export const getLogActivities = () => {

  return base.get(`/log-activities/list?availablePropertyType=STR`).then(({ data }) => data).catch((err) => {
    console.error("Error retrieving log activities:", err?.response?.data?.message || err?.message);
    throw err;
  });
}

const createLTRRecord = (data) =>
  base.post("/activity-logs", data).then(({ data }) => data).catch((err) => {
    console.error("Error recording time:", err?.response?.data?.message || err?.message);
    throw err;
  });

const createSTRRecord = (data) =>
  base.post("/activity-logs/add-str-log", data).then(({ data }) => data).catch((err) => {
    console.error("Error recording time:", err?.response?.data?.message || err?.message);
    throw err;
  });

export const createRecordService = {
  ltr: createLTRRecord,
  str: createSTRRecord,
};

export const editLog = (data) => {
  const { id, name, activityDate, timeSpent, description, propertyType, supportingDocuments } = data

  const reqBody = { name, activityDate, timeSpent, description, propertyType, supportingDocuments }
  return base.patch(`/activity/${id}`, reqBody).then(({ data }) => data).catch((err) => {
    console.error("Error updating log time:", err?.response?.data?.message || err?.message);
    throw err;
  });
};

export const deleteLog = (id) => {

  return base
    .delete(`/activity/${id}`)
    .then(({ data }) => data).catch((err) => {
      console.error("Error deleting log:", err?.response?.data?.message || err?.message);
      throw err;
    });
}

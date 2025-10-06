import base from "../../libs/axios";

export const getProperties = (params = {}) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    propertyType = 'ALL'
  } = params;

  let queryString = `/properties?PageNumber=${pageNumber}&PageSize=${pageSize}&propertyType=${propertyType}`;
  
  return base.get(queryString).then(({ data }) => data).catch((err) => {
    console.error("Error retrieving properties:", err?.response?.data?.message || err?.message);
    throw err;
  });
}

export const getSomeProperties = (keyword) =>
  base.get(`/properties/search?keyword=${keyword}`).then(({ data }) => data).catch((err) => {
    console.error("Error retrieving properties:", err?.response?.data?.message || err?.message);
    throw err;
  });

  export const getProperty = (id) =>
    base.get(`/properties/${id}`).then(({ data }) => data).catch((err) => {
      console.error("Error retrieving property:", err?.response?.data?.message || err?.message);
      throw err;
    });

export const createProperty = (data) =>
  base.post("/properties", data).then(({ data }) => data).catch((err) => {
    console.error("Error creating property:", err?.response?.data?.message || err?.message);
    throw err;
  });

export const editProperty = ({id, name, address}) => {
  const data = {name, address}
  return base.patch(`/properties/${id}`, data).then(({ data }) => data).catch((err) => {
    console.error("Error updating property:", err?.response?.data?.message || err?.message);
    throw err;
  });
};

export const deleteProperty = (id) => {

  return base
    .delete(`/properties/${id}`)
    .then(({ data }) => data).catch((err) => {
      console.error("Error deleting property:", err?.response?.data?.message || err?.message);
      throw err;
    });
}

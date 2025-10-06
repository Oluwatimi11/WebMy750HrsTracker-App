import base from "../../libs/axios";

export const getTeamMembers = (params = {}) => {
  const {
    pageNumber = 1,
    pageSize = 10,
  } = params;

  let queryString = `/team/get-users?PageNumber=${pageNumber}&PageSize=${pageSize}`;

  return base.get(queryString).then(({ data }) => data).catch((err) => {
    console.error("Error getting team members:", err?.response?.data?.message || err?.message);
    throw err;
  });
}

export const getRoles = (params = {}) => {
  const {
    pageNumber = 1,
    pageSize = 10,
  } = params;

  let queryString = `/team/roles?PageNumber=${pageNumber}&PageSize=${pageSize}`;

  return base.get(queryString).then(({ data }) => data).catch((err) => {
    console.error("Error getting roles:", err?.response?.data?.message || err?.message);
    throw err;
  });
}

export const inviteTeamMember = (data) => 
  base.post(`/team/invite-user`, data).then(({ data }) => data).catch((err) => {
    console.error("Error creating inviting new team member:", err?.response?.data?.message || err?.message)
    throw err;
  });

  export const createTeamMember = (data) => 
  base.post(`/team/create-invited-user`, data).then(({ data }) => data).catch((err) => {
    console.error("Error creating team member:", err?.response?.data?.message || err?.message)
    throw err;
  });

export const getPermissions = (params = {}) => {
  const {
    pageNumber = 1,
    pageSize = 10,
  } = params;

  let queryString = `/permissions?PageNumber=${pageNumber}&PageSize=${pageSize}`;
  
  return base.get(queryString).then(({ data }) => data).catch((err) => {
    console.error("Error getting permissions:", err?.response?.data?.message || err?.message);
    throw err;
  });
}

export const editTeamMember = (data) => {

  return base.patch(`/team/update-user-role`, data).then(({ data }) => data).catch((err) => {
    console.error("Error updating team member:", err?.response?.data?.message || err?.message);
    throw err;
  });
};

export const deleteTeamMember = (id) => {

  return base
    .delete(`/team/roles/${id}`)
    .then(({ data }) => data).catch((err) => {
      console.error("Error deleting team member:", err?.response?.data?.message || err?.message);
      throw err;
    });
}

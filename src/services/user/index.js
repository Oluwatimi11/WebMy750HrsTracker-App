import base from "../../libs/axios";

export const updateUserDetails = (data) => {
  const { id, firstname, lastname } = data;
  
  return base.patch(`/users/${id}`, { firstname, lastname }).then(({ data }) => data).catch((err) => {
    console.error("Error updating user details:", err?.response?.data?.message || err?.message)
    throw err;
  });
}


export const updateUserPhoto = (data) => {
  const { id, profilePicture } = data;
  return base.patch(`/users/${id}/update-profile-pic`, { ...profilePicture }).then(({ data }) => data).catch((err) => {
    console.error("Error updating user profile photo:", err?.response?.data?.message || err?.message)
    throw err;
  });
}


export const getUser = (id) => {
  return base.get(`/users/${id}`).then(({ data }) => data?.data).catch((err) => {
    console.error("Error retrieving user details:", err?.response?.data?.message || err?.message)
    throw err;
  });
}

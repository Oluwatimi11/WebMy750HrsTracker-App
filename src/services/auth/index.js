import base from "../../libs/axios";

export const signUp = (data) =>
  base.post("/users/signup", data).then(({ data }) => data).catch((err) => {
    console.error("Error registering user:", err?.response?.data?.message || err?.message);
    throw err;
  });

export const signIn = (data) =>
  base.post("/users/signin", data).then(({ data }) => data).catch((err) => {
    console.error("Error logging in:", err?.response?.data?.message || err?.message);
    throw err;
  });

export const verifyEmail = (data) => {
  return base.patch("/users/verify-email", data).then(({ data }) => data).catch((err) => {
    console.error("Error verifying user account", err?.response?.data?.message || err?.message);
    throw err;
  });
};

export const resendVerificationEmail = (data) => {
  return base.patch("/users/resend-verification-email", data).then(({ data }) => data).catch((err) => {
    console.error("Error resending verification email:", err?.response?.data?.message || err?.message);
    throw err;
  });
};

export const forgotPassword = (data) => {
  return base.post("/users/recover-password", data).then(({ data }) => data).catch((err) => {
    console.error("Error resetting password:", err?.response?.data?.message || err?.message);
    throw err;
  });
};

export const resetPassword = (data) => {
  return base
    .post("/users/reset-password", data)
    .then(({ data }) => data).catch((err) => {
      console.error("Error resetting password:", err?.response?.data?.message || err?.message);
      throw err;
    });
}

export const changePassword = (data) => {
  const { id, values } = data
  return base.patch(`/users/${id}/change-password`, values).then(({ data }) => data).catch((err) => {
    console.error("Error updating password:", err?.response?.data?.message || err?.message);
    throw err;
  });
};
import base from "../../libs/axios";

export const sendSupportMessage = (data) => 
  base.post(`/public/send-support-notification`, data, {
    headers: {
      'pub-access-key': process.env.REACT_APP_PUBLIC_ACCESS_KEY
    }
  }).then(({ data }) => data).catch((err) => {
    console.error("Error sending support message:", err?.response?.data?.message || err?.message)
    throw err;
  });
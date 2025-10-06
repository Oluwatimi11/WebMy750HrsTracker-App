import base from "../../libs/axios";

export const getSubscriptions = () =>
  base.get(`/subscriptions/all`).then(({ data }) => data);
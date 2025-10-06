import { showToast } from "../../app/components/atoms/showToast/showToast";
import { NotificationTypes } from "../../app/constants";
import queryKeys from "../../libs/react-query/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { sendSupportMessage } from "../../services/support";

export const useSendSupportMessage = (data) => {

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => sendSupportMessage(data),
    mutationKey: [queryKeys.sendSupportMessage, data],
    onSuccess: () => {
      showToast("Message successfully sent", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error sending support message", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};

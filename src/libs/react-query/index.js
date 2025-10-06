import { QueryClient } from "@tanstack/react-query";
import { showToast } from "../../app/components/atoms/showToast/showToast";
import { NotificationTypes } from "../../app/constants";

const errorHandler = (error, query) => {
    if (query.meta.errorMessage) {
      showToast(query.meta.errorMessage, NotificationTypes.ERROR)
    }
    showToast(`Something went wrong: ${error?.response?.data?.message || error?.message}`, NotificationTypes.ERROR)
    console.error(
      "An error occured: ",
      error?.response?.data?.message || error?.message
    );
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: errorHandler,
      // staleTime: 600000,
      cacheTime: 900000,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

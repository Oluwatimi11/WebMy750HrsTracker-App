import { showToast } from "../../app/components/atoms/showToast/showToast";
import { NotificationTypes } from "../../app/constants";
import queryKeys from "../../libs/react-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createImportHours } from "../../services/import-hours";



export const useCreateImportHours = (data) => {
    const queryClient = useQueryClient();
  
    const { isPending, mutate } = useMutation({
      mutationFn: (data) => createImportHours(data),
      mutationKey: [queryKeys.createImportHours, data],
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getImportHours);
        showToast("Hours imported successfully", NotificationTypes.SUCCESS)
      },
      onError: () => {
        showToast("Error importing hours", NotificationTypes.ERROR)
      },
    });
  
    return { isPending, mutate };
  };
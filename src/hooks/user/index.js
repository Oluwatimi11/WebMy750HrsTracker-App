import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../app/components/atoms/showToast/showToast";
import { LocalStorageKeys, NotificationTypes } from "../../app/constants";
import queryKeys from "../../libs/react-query/queryKeys";
import { getUser, updateUserDetails, updateUserPhoto } from "../../services/user";
import { decryptString, encryptString, pick } from "../../utils/utils/utils";

export const useUpdateUserDetails = (data) => {
  const oldUserDetails = useUserDetail()

  const { isPending, mutate } = useMutation({
    mutationKey: [queryKeys.sendSupportMessage, data],
    mutationFn: (data) => updateUserDetails(data),
    onSuccess: (data) => {
      // save user info to local storage
      const user = pick(data?.data, ['firstName', 'lastName'])
      const encryptedEmail = encryptString(oldUserDetails?.email, process.env.REACT_APP_ENCRYPTION_KEY);

      const updatedUser = { ...oldUserDetails, ...user, email: encryptedEmail }
      localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(updatedUser));

      showToast("User details successfully updated", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error updating user details", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
}

export const useUserDetail = () => {
  const user = JSON.parse(localStorage.getItem(LocalStorageKeys.USER));
  const decryptedEmail = decryptString(
    user?.email,
    process.env.REACT_APP_ENCRYPTION_KEY
  );

  return {
    email: decryptedEmail,
    name: (user?.firstName && user?.lastName) ? `${user?.firstName} ${user?.lastName}` : 'User',
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
  };
};


export const useUpdateUserPhoto = (data) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: [queryKeys.updateUserPhoto, data],
    mutationFn: (data) => updateUserPhoto(data),
    onSuccess: (data) => {
      // save user info to local storage
      queryClient.invalidateQueries(queryKeys.getUserPhoto);
      // const userPhoto = pick(data?.data, ['img'])

      showToast("User photo successfully updated", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error updating user photo", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
}

export const useGetUser = (id) => {

  const { isLoading, isRefetching, data} = useQuery({
    queryKey: [queryKeys.getUser, id],
    queryFn: () => getUser(id),
    meta: {
      errorMessage: "Error retrieving user details",
    }
  });
  return { isLoading : isRefetching || isLoading, data };
}
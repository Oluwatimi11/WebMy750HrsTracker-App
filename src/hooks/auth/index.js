import { showToast } from "../../app/components/atoms/showToast/showToast";
import { LocalStorageKeys, NotificationTypes } from "../../app/constants";
import queryKeys from "../../libs/react-query/queryKeys";
import { changePassword, forgotPassword, resendVerificationEmail, resetPassword, signIn, signUp, verifyEmail } from "../../services/auth";
import { useMutation } from "@tanstack/react-query";
import { encryptString, pick } from "../../utils/utils/utils";


export const useSignUp = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => signUp(data),
    mutationKey: [queryKeys.signup],
    onSuccess: () => {
      showToast("User registered successfully", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error registering user", NotificationTypes.ERROR)
    },
  });

  return { mutate, isPending };
};

export const useSignIn = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => signIn(data),
    mutationKey: [queryKeys.signin],
    onSuccess: async (data) => {

      // save user info to local storage
      const user = pick(data?.data, ['id', 'firstName', 'lastName', 'email'])
      const encryptedEmail = await encryptString(user?.email, process.env.REACT_APP_ENCRYPTION_KEY);
      const userWithEncryptedEmail = {
        ...user,
        email: encryptedEmail
      };
      localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(userWithEncryptedEmail));

      // save access token & duration to local storage
      localStorage.setItem(LocalStorageKeys.TOKEN, data?.data?.token);
      localStorage.setItem(LocalStorageKeys.TOKENDURATION, data?.data?.tokenExpireAt);

      showToast("Login Successful...", NotificationTypes.SUCCESS);
    },
    onError: () => {
      showToast("Error signing in", NotificationTypes.ERROR)
    },
  });

  return { mutate, isPending };
};

export const useVerifyEmail = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => verifyEmail(data),
    mutationKey: [queryKeys.verifyEmail],
    onSuccess: () => {
      showToast("Account successfully verified. You can now login...", NotificationTypes.SUCCESS);
    },
    onError: () => {
      showToast("Error verifying user account", NotificationTypes.ERROR)
    },
  });

  return { mutate, isPending };
};

export const useResendVerificationEmail = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => resendVerificationEmail(data),
    mutationKey: [queryKeys.resendVerificationEmail],
    onSuccess: () => {
      showToast("Verification token sent. Please check your email...", NotificationTypes.SUCCESS);
    },
    onError: () => {
      showToast("Error resending verification mail", NotificationTypes.ERROR)
    },
  });

  return { mutate, isPending };
};

export const useForgotPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => forgotPassword(data),
    mutationKey: [queryKeys.forgotPassword],
    onSuccess: () => {
      showToast(`Password reset successful. Check your mail for a reset token...`, NotificationTypes.SUCCESS);
    },
    onError: () => {
      showToast("Error resetting password", NotificationTypes.ERROR)
    },
  });

  return { mutate, isPending };
};

export const useResetPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => resetPassword(data),
    mutationKey: [queryKeys.resetPassword],
    onSuccess: () => {
      showToast(`Password reset successful...`, NotificationTypes.SUCCESS);
    },
    onError: () => {
      showToast("Error resetting password", NotificationTypes.ERROR)
    },
  });

  return { mutate, isPending };
};

export const useChangePassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => changePassword(data),
    mutationKey: [queryKeys.changePassword],
    onSuccess: () => {
      showToast(`Password update successful...`, NotificationTypes.SUCCESS);
    },
    onError: () => {
      showToast("Error updating password", NotificationTypes.ERROR)
    },
  });

  return { mutate, isPending };
};
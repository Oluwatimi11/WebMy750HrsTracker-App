import { showToast } from "../../app/components/atoms/showToast/showToast";
import { NotificationTypes } from "../../app/constants";
import queryKeys from "../../libs/react-query/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createTeamMember, deleteTeamMember, editTeamMember, getRoles, getTeamMembers, inviteTeamMember } from "../../services/team-members";


export const useGetTeamMembers = (queryData) => {

  const { isLoading, isRefetching, isFetching, data } = useQuery({
    queryFn: () => getTeamMembers(queryData),
    queryKey: [queryKeys.getTeamMembers, queryData],
    meta: {
      errorMessage: "Error retrieving team members",
    }
  });

  const normalizeData = (data) => {
    if (data?.data) {
      return data?.data?.map((item) => {
        return {
          ...item,
          name: item.firstName + " " + item.lastName
        }
      })
    }
    return []
  }

  const clientData = useMemo(() => {
    return {
      teamMembers: normalizeData(data) || [],
      count: data?.totalRecords || 0,
      currentPage: data?.pageNumber || 1
    };
  }, [data]);

  return { isLoading: isLoading || isRefetching || isFetching, clientData };
};

export const useGetRoles = (queryData) => {
  const { isLoading, isRefetching, isFetching, data } = useQuery({
    queryFn: () => getRoles(queryData),
    queryKey: [queryKeys.getRoles, queryData],
    meta: {
      errorMessage: "Error retrieving permissions",
    }
  });

  const clientData = useMemo(() => {
    return {
      roles: data?.data || [],
      count: data?.totalRecords || 0,
      currentPage: data?.pageNumber || 1
    };
  }, [data]);

  return { isLoading: isLoading || isRefetching || isFetching, clientData };
};

export const useInviteTeamMember = (data) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => inviteTeamMember(data),
    mutationKey: [queryKeys.inviteTeamMember, data],
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getTeamMembers);
      showToast("Invite mail successfully sent to Team member", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error inviting new team member", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};

export const useCreateTeamMember = (data) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => createTeamMember(data),
    mutationKey: [queryKeys.createTeamMember, data],
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getTeamMembers);
      showToast("Team member created successfully", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error creating team member", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};

export const useEditTeamMember = (data) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => editTeamMember(data),
    mutationKey: [queryKeys.editTeamMember, data],
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getTeamMembers);
      showToast("Team member updated successfully", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error updating team member", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};

export const useDeleteTeamMember = (id) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteTeamMember(id),
    mutationKey: [queryKeys.deleteTeamMember, id],
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getTeamMembers);
      showToast("Team member deleted successfully", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error deleting team member", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};
import { showToast } from "../../app/components/atoms/showToast/showToast";
import { NotificationTypes } from "../../app/constants";
import queryKeys from "../../libs/react-query/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProperty, deleteProperty, editProperty, getProperties, getSomeProperties } from "../../services/properties";
import { useMemo } from "react";


export const useGetProperties = (queryData) => {

  const { isLoading, isRefetching, isFetching, data } = useQuery({
    queryFn: () => getProperties(queryData),
    queryKey: [queryKeys.getProperties, queryData],
    meta: {
      errorMessage: "Error retrieving properties",
    }
  });

  const clientData = useMemo(() => {
    return {
      properties: data?.data || [],
      count: data?.totalRecords || 0,
      currentPage: data?.pageNumber || 1
    };
  }, [data]);

  return { isLoading: isLoading || isRefetching || isFetching, clientData };
};

export const useGetSomeProperties = (keyword) => {
  const initialData = []

  const { isLoading, isRefetching, isFetching, data = initialData } = useQuery({
    queryFn: (keyword) => getSomeProperties(keyword),
    queryKey: [queryKeys.getSomeProperties, keyword],
    meta: {
      errorMessage: "Error retrieving properties",
    }
  });

  const clientData = useMemo(() => {
    return {
      properties: data?.data || [],
      count: data?.totalRecords || 0,
      currentPage: data?.pageNumber || 1
    };
  }, [data]);

  return { isLoading: isLoading || isRefetching || isFetching, clientData };
};

export const useCreateProperty = (data) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => createProperty(data),
    mutationKey: [queryKeys.createProperty, data],
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getProperties);
      showToast("Property created successfully", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error creating property", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};

export const useEditProperty = (data) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => editProperty(data),
    mutationKey: [queryKeys.editProperty, data],
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getProperties);
      showToast("Property updated successfully", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error updating property", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};

export const useDeleteProperty = (id) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteProperty(id),
    mutationKey: [queryKeys.deleteProperty, id],
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getProperties);
      showToast("Property deleted successfully", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error deleting property", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};
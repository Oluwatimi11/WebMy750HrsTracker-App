import { showToast } from "../../app/components/atoms/showToast/showToast";
import { NotificationTypes, recordCategoryKeys } from "../../app/constants";
import queryKeys from "../../libs/react-query/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createRecordService, deleteLog, editLog, getActivityLogs, getLogActivities, getLogCategories, getSomeActivityLogs } from "../../services/activity-log";
import { extractValue, mapOptions } from "../../app/pages/dashboard/record-time/utils";


export const useGetLogs = (
  params
) => {

  const {
    data,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [
      queryKeys.getLogs,
      params
    ],
    queryFn: () => getActivityLogs(params),
    meta: {
      errorMessage: "Error retrieving logs",
    }
  });

  const clientData = useMemo(() => {
    return {
      logs: data?.data || [],
      count: data?.totalRecords || 0,
      currentPage: data?.pageNumber || 1
    };
  }, [data]);

  return {
    clientData,
    isLoading: isLoading || isRefetching,
  };
};

export const useGetSomeLogs = (keyword) => {

  const { isPending, isRefetching, data } = useQuery({
    queryFn: () => getSomeActivityLogs(keyword),
    queryKey: [queryKeys.getSomeLogs, keyword],
    meta: {
      errorMessage: "Error retrieving logs",
    }
  });

  const clientData = useMemo(() => {
    return {
      logs: data?.data || [],
      count: data?.totalRecords || 0,
      currentPage: data?.pageNumber || 1
    };
  }, [data]);

  return { isLoading: isPending || isRefetching, clientData };
}

export const useGetLogCategories = () => {

  const {
    data,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [
      queryKeys.getLogCategories,

    ],
    queryFn: () => getLogCategories(),
    meta: {
      errorMessage: "Error retrieving log categories",
    }
  });

  const clientData = useMemo(() => {

    const realEstate = data?.find(item => item.logType === "REAL ESTATE")
    const realEstateCategories = realEstate?.categories || []

    const generalActivity = realEstateCategories?.find(
      (category) => category.id === recordCategoryKeys.generalActivity
    )?.activities;
    const materialParticipation = realEstateCategories?.find(
      (category) => category.id === recordCategoryKeys.materialParticipation
    )?.activities;

    return {
      categories: mapOptions(realEstateCategories),
      generalActivityCategories: mapOptions(extractValue(realEstateCategories, recordCategoryKeys.generalActivity, "activities")) || [],
      materialParticipationCategories: mapOptions(extractValue(realEstateCategories, recordCategoryKeys.materialParticipation, "activities")) || [],
      attemptedPropertyAcquisitionGAT: mapOptions(extractValue(generalActivity, recordCategoryKeys.attemptedPropertyAcquisitions)) || [],
      leasingAndBrokerageGAT: mapOptions(extractValue(generalActivity, recordCategoryKeys.leasingAndBrokerage)) || [],
      realEstateProfessionalEducationGAT: mapOptions(extractValue(generalActivity, recordCategoryKeys.realEstateProfessionalEducation)) || [],
      generalNetworkingGAT: mapOptions(extractValue(generalActivity, recordCategoryKeys.generalNetworking)) || [],
      investorHoursGAT: mapOptions(extractValue(generalActivity, recordCategoryKeys.investorHours)) || [],
      successfulPropertyAcquisitionMPT: mapOptions(extractValue(materialParticipation, recordCategoryKeys.successfulPropertyAcquisition)) || [],
      propertyManagementAndOperationMPT: mapOptions(extractValue(materialParticipation, recordCategoryKeys.propertyManagementAndOperations)) || [],
      propertyConstructionReconstructionMPT: mapOptions(extractValue(materialParticipation, recordCategoryKeys.propertyConstructionReconstruction)) || [],
    };
  }, [data]);

  return {
    clientData,
    isLoading: isLoading || isRefetching,
  };
};

export const useGetLogActivities = () => {

  const {
    data,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [
      queryKeys.getLogActivities
    ],
    queryFn: () => getLogActivities(),
    meta: {
      errorMessage: "Error retrieving log activities",
    }
  });

  const clientData = useMemo(() => {
    return {
      activities: data?.data || [],
      count: data?.totalRecords || 0,
      currentPage: data?.pageNumber || 1
    };
  }, [data]);

  return {
    clientData,
    isLoading: isLoading || isRefetching,
  };
};

export const useCreateRecord = (dataKey, data) => {

  const createRecord = async (dataKey, data) => {
    const mutationFn = createRecordService[dataKey];

    if (typeof mutationFn === "function" && data) {
      await mutationFn(data);
    } else {
      throw new Error("Invalid query function or date filter"); // Throw an error if the query function or date filter is not valid
    }
  }

  const { isPending } = useMutation({
    mutationFn: (dataKey, data) => createRecord(dataKey, data),
    mutationKey: [queryKeys[dataKey], data, dataKey],
    onSuccess: () => {
      showToast("Time recorded successfully", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error recording time", NotificationTypes.ERROR)
    },
  });

  return { isPending, createRecord };
};

export const useEditLog = (data) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => editLog(data),
    mutationKey: [queryKeys.editLog, data],
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getLogs);
      showToast("Log updated successfully", NotificationTypes.SUCCESS)
    },
    onError: () => {
      showToast("Error updating log", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};

export const useDeleteLog = (id) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteLog(id),
    mutationKey: [queryKeys.deleteLog, id],
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getLogs);
      showToast("Log deleted successfully", NotificationTypes.SUCCESS)
    },
    onError: (error) => {
      showToast("Error deleting log", NotificationTypes.ERROR)
    },
  });

  return { isPending, mutate };
};
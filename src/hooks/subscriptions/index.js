import queryKeys from "../../libs/react-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptions } from "../../services/subscriptions";
import { useMemo } from "react";


export const useGetSubscriptions = (queryData) => {

  const { isLoading, isRefetching, isFetching, data } = useQuery({
    queryFn: () => getSubscriptions(queryData),
    queryKey: [queryKeys.getSubscriptions, queryData],
    meta: {
      errorMessage: "Error retrieving subscription plans",
    }
  });

  const clientData = useMemo(() => {
    return {
      subscriptions: data?.data || [],
    //   count: data?.totalRecords || 0,
    //   currentPage: data?.pageNumber || 1
    };
  }, [data]);

  return { isLoading: isLoading || isRefetching || isFetching, clientData };
};


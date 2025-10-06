import queryKeys from "../../libs/react-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getChartData } from "../../services/dashboard";

export const useGetChartData = (param) => {

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [queryKeys.getChartData, param],
    queryFn: () => getChartData(param),
    meta: {
      errorMessage: "Error fetching chart data",
    }
  });

  return { isLoading: isLoading || isFetching, data };
};

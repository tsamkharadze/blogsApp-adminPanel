import { useQuery } from "react-query";
import { getProfileInfo } from "../../../supabase/account";

export const useGetProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["profileInfo", userId],
    queryFn: () => getProfileInfo(userId!),
    enabled: !!userId,
    select: (data) => data?.data?.[0],
  });
};

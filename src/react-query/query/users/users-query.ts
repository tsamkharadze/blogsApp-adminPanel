import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  getSingleUserAsAdmin,
  getUsersListInAdmin,
} from "../../../supabase/users/get-users";
import { User } from "../../../components/types/user";

export const useGetSingleUserAsAdmin = <T = User | null>({
  id,
  queryOptions = {},
}: {
  id: string;
  queryOptions?: Omit<UseQueryOptions<T, unknown, T>, "queryKey">;
}): UseQueryResult<T, unknown> => {
  return useQuery<T, unknown, T>({
    queryKey: ["singleUserForEdit", id],
    queryFn: async () => {
      if (!id) throw new Error("User ID is missing");
      const user = await getSingleUserAsAdmin(id);
      return user as T;
    },
    enabled: !!id,
    ...queryOptions,
  });
};

export const useGetUsersAsAdmin = <T = User[]>({
  queryOptions = {},
}: {
  queryOptions?: Omit<UseQueryOptions<T, unknown, T>, "queryKey">;
} = {}): UseQueryResult<T, unknown> => {
  return useQuery<T, unknown, T>({
    queryKey: ["usersInAdmin"],
    queryFn: async () => (await getUsersListInAdmin()) as unknown as T,
    ...queryOptions,
  });
};

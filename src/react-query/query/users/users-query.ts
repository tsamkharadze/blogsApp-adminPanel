import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  getSingleUserAsAdmin,
  getUsersListInAdmin,
} from "../../../supabase/users/get-users";
import { User } from "../../../components/types/user";

export const useGetSingleUserAsAdmin = (id: string | undefined) => {
  return useQuery({
    queryKey: ["singleUserForEdit", id],
    queryFn: () => {
      if (!id) throw new Error("User ID is missing");
      return getSingleUserAsAdmin(id);
    },
    enabled: !!id,
  });
};

// export const useGetUsersAsAdmin = () => {
//   return useQuery<User[]>({
//     queryKey: ["usersInAdmin"],
//     queryFn: getUsersListInAdmin,

//   });
// };

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

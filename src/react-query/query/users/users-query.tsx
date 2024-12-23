import { useQuery } from "react-query";
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

export const useGetUsersAsAdmin = () => {
  return useQuery<User[]>({
    queryKey: ["usersInAdmin"],
    queryFn: getUsersListInAdmin,
  });
};

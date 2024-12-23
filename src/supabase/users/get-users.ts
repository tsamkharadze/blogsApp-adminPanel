import { supabase } from "..";
import { User } from "../../components/types/user";

export const getUsersListInAdmin = async (): Promise<User[]> => {
  const response = await supabase.auth.admin.listUsers();

  if (response.data?.users && Array.isArray(response.data.users)) {
    return response.data.users as User[];
  }

  return [];
};

export const editUserAsAdmin = (
  id: string,
  payload: { email: string; phone: string }
) => {
  return supabase.auth.admin.updateUserById(id, { ...payload });
};

export const getSingleUserAsAdmin = (id: string) => {
  return supabase.auth.admin.getUserById(id).then((res) => {
    return res.data.user;
  });
};

export const createNewUser = (payload: { email: string; phone: string }) => {
  supabase.auth.admin.createUser(payload);
};

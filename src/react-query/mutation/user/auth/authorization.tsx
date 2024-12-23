import { useMutation } from "react-query";
import { login, logout, registerUser } from "../../../../supabase/auth";

export const useSignIn = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
};

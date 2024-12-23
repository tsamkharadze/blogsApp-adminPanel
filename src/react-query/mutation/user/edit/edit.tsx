import { useMutation } from "react-query";
import { fillProfileInfo } from "../../../../supabase/account";

export const useEditProfile = () => {
  return useMutation({
    mutationFn: fillProfileInfo,
  });
};

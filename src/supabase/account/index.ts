import { supabase } from "..";
import { Database } from "../supabase.types";

export const fillProfileInfo = async (
  data: Database["public"]["Tables"]["profiles"]["Insert"],
) => {
  return supabase.from("profiles").upsert(data);
};

export const getProfileInfo = async (id: string | number) => {
  return await supabase.from("profiles").select("*").eq("id", id);
};

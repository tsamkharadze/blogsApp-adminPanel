import { supabase } from "..";

export const updateBlog = async (data) => {
  return supabase.from("blogs").upsert(data);
};

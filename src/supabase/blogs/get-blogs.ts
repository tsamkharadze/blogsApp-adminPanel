import { supabase } from "..";
import { Database } from "../supabase.types";

export const getBlogs = async (): Promise<
  Database["public"]["Tables"]["blogs"]["Insert"][]
> => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getFilteredBlogs = async (
  searchQuery: string = "",
): Promise<Database["public"]["Tables"]["blogs"]["Row"][]> => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    // .ilike("title_en", `%${searchQuery}%`)
    .or(`title_en.ilike.%${searchQuery}%,title_ka.ilike.%${searchQuery}%`)
    .order("created_at", { ascending: false })
    .throwOnError();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getSingleCountry = async (
  blogId: number | string, // Assuming the `id` can be a number or string
): Promise<Database["public"]["Tables"]["blogs"]["Row"] | null> => {
  const { data, error } = await supabase
    .from("blogs") // Replace with your actual table name
    .select("*")
    .eq("id", blogId) // Filter by the `id` column
    .single() // Ensures only one row is returned
    .throwOnError();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

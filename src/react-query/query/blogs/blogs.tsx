import { useQuery } from "react-query";
import { getBlogById, getBlogs } from "../../../supabase/blogs/get-blogs";

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
};

export const useGetSingleBlog = (id: string | undefined) => {
  return useQuery({
    queryKey: ["single-country", id],
    queryFn: () => {
      if (!id) {
        throw new Error("ID is required");
      }
      return getBlogById(id);
    },
  });
};

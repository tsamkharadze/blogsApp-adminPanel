import { useMutation } from "react-query";
import { updateBlog } from "../../../../supabase/blogs/edit-blog";

export const useEditBlogs = () => {
  return useMutation({
    mutationFn: updateBlog,
  });
};

import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getBlogById, getBlogs } from "../../../supabase/blogs/get-blogs";
import { Blog } from "../../../components/types/blog";

export const useGetSingleBlog = <T = Blog | null>({
  id,
  queryOptions = {},
}: {
  id: string;
  queryOptions?: Omit<UseQueryOptions<T, unknown, T>, "queryKey">;
}): UseQueryResult<T, unknown> => {
  return useQuery<T, unknown, T>({
    queryKey: ["single-blog", id],
    queryFn: async () => {
      if (!id) throw new Error("Blog ID is missing");
      const blog = await getBlogById(id);
      return blog as T;
    },
    enabled: !!id,
    ...queryOptions,
  });
};

export const useGetBlogs = <T = Blog[]>({
  queryOptions = {},
}: {
  queryOptions?: Omit<UseQueryOptions<T, unknown, T>, "queryKey">;
} = {}): UseQueryResult<T, unknown> => {
  return useQuery<T, unknown, T>({
    queryKey: ["blogs"],
    queryFn: async () => (await getBlogs()) as unknown as T,
    ...queryOptions,
  });
};

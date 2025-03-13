import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import { type User } from "../types/types";

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{
      nextCursor?: number;
      users: User[];
    }>({
      queryKey: ["users"],
      queryFn: ({ pageParam = 1 }) =>
        fetchUsers({ pageParam: pageParam as number }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 1,
      refetchOnWindowFocus: false,
    });

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) ?? [],
    hasNextPage,
  };
};

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { createUser } from '@/appwrite/Api';
import { CreateUserTypes } from '@/types';
// import {createUs}

// const queryClient = useQueryClient();

export const mutateCreateUser = () => {
  return useMutation({
    mutationFn: (values: CreateUserTypes) => createUser(values),
    // onSuccess: () => {
    //   // Invalidate and refetch
    //   queryClient.invalidateQueries({ queryKey: ['todos'] });
    // },
  });
};

// Queries
// const query = useQuery({ queryKey: ['todos'], queryFn: getTodos });

// Mutations

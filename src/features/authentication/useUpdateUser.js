import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User account succesfully updated!!');
      queryClient.setQueryData(['user'], user); // place user in the cache for easy reachability
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: deleteLoading, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinAPI,
    onSuccess: () => {
      toast.success('Cabin succesfull deleted!!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteLoading, deleteCabin };
}

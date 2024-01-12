import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBook, isLoading: isDeletingBook } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Booking succesfully deleted ! `);
      queryClient.invalidateQueries({ queryKey: ['bookings'] }); //invalidate queries active on the page
    },
    onError: () =>
      toast.error('There was an error while deleting the booking!'),
  });
  return { deleteBook, isDeletingBook };
}

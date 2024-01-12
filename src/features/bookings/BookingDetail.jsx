import styled from 'styled-components';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useDeleteBooking } from './useDeleteBooking';
import { useNavigate } from 'react-router-dom';
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBook, isDeletingBook } = useDeleteBooking();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };
  if (isLoading || isCheckingOut) return <Spinner />;
  if (!booking) return <Empty resourceName='booking' />;
  const { status, id } = booking;
  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check In
          </Button>
        )}
        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(id)}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}
        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete
              disabled={isDeletingBook}
              resourceName='booking'
              onConfirm={() => {
                deleteBook(id, { onSettled: () => navigate(-1) });
              }}
            />
          </Modal.Window>
        </Modal>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

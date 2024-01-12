import { useSettings } from './useSettings';

import Form from '../../ui/Form';
import FormRow from '../cabins/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isUpdating, updateSetting } = useUpdateSetting();
  const {
    isLoading,
    settings: {
      minBookingLenght,
      maxBookingLength,
      maxNumberOfGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const handleUpdate = (e, field) => {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLenght}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLenght')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxNumberOfGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxNumberOfGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

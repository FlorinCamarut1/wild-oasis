import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

import Input from '../../ui/Input';
import FormRow from './FormRow';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        { onSuccess: (data) => reset() },
        onCloseModal?.()
      );
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        { onSuccess: (data) => reset() },
        onCloseModal?.()
      );
    }
  };
  const onError = (errors) => {};

  const isWorking = isCreating || isEditing;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='cabin name' errors={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label='maximum capacity' errors={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be atleast 1' },
          })}
        />
      </FormRow>

      <FormRow label='price' errors={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be atleast 1' },
          })}
        />
      </FormRow>

      <FormRow label='discount' errors={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type='number'
          id='discount'
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label='description' errors={errors?.description?.message}>
        <Textarea
          disabled={isWorking}
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='cabin photo'>
        <FileInput
          id='image'
          type='file'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation='primary' size='medium' disabled={isWorking}>
          {isEditSession ? 'Edit Cabin' : 'Create New Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
